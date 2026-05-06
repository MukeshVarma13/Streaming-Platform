package dev.misfit.StreamingPlatform.services.impl;

import dev.misfit.StreamingPlatform.DTO.FFMpegRequest;
import dev.misfit.StreamingPlatform.DTO.FFMpegResponse;
import dev.misfit.StreamingPlatform.customExceptions.FFmpegFailedException;
import dev.misfit.StreamingPlatform.customExceptions.RecordingNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.io.File;

@Service
@Slf4j
public class AsyncProcessService {

    @Value("${videos.path}")
    String videoPath;
    @Value("${live.videos.path}")
    String liveVideoUrl;

    private final RestClient restClient;

    public AsyncProcessService(RestClient restClient) {
        this.restClient = restClient;
    }

    @Async
    public void pushStreamProcessing(FFMpegRequest request){
        if (request == null) {
            log.warn("Provided request id null: line 179");
            return;
        }
        String streamerId = request.getUserId();
        String streamKey = request.getStreamKey();
        String outputFolder = videoPath + "/" + streamerId + "/" + streamKey;
        new File(outputFolder).mkdirs();
        log.info("current to consume stream from queue {}", Thread.currentThread().getName());
        log.info("Stream request is {}", request.getStreamKey());
        try {
//            Thread.sleep(20000);
            log.info("Thread Started");
            FFMpegResponse ffMpegResponse = ffmpegConverter(
                    new FFMpegRequest(streamKey, streamerId)
            );
            log.info("Response for the thread: {}", ffMpegResponse.toString());
            log.info("Thread finished");
        } catch (RecordingNotFoundException notFoundException) {
            log.error(notFoundException.getMessage());
        } catch (FFmpegFailedException ex) {
            log.error("{}retrying at line 53", ex.getMessage());
//        } catch (InterruptedException e) {
//            throw new RuntimeException(e);
        }
    }

    @Async
    public void stopStream(String streamKey) {

        restClient.post()
                .uri("/stop/" + streamKey)
                .retrieve()
                .toBodilessEntity();
    }

    public FFMpegResponse ffmpegConverter(FFMpegRequest request) {
        return restClient.post()
                .uri("/convert")
                .contentType(MediaType.APPLICATION_JSON)
                .body(request)
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, (req, res) -> {
                    throw new RecordingNotFoundException("No recording found for streamKey: " + request.getStreamKey());
                })
                .onStatus(HttpStatusCode::is5xxServerError, (req, res) -> {
                    throw new FFmpegFailedException("FFmpeg conversion failed for streamKey: " + request.getStreamKey());
                })
                .body(FFMpegResponse.class);
    }
}
