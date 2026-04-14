package dev.misfit.StreamingPlatform.services.impl;

import dev.misfit.StreamingPlatform.DTO.StartStreamRequest;
import dev.misfit.StreamingPlatform.DTO.StartStreamResponse;
import dev.misfit.StreamingPlatform.DTO.StreamVideosResponse;
import dev.misfit.StreamingPlatform.DTO.StreamerResponse;
import dev.misfit.StreamingPlatform.customExceptions.StreamNotFoundException;
import dev.misfit.StreamingPlatform.customExceptions.StreamProcessingException;
import dev.misfit.StreamingPlatform.customExceptions.UnauthorizedUserException;
import dev.misfit.StreamingPlatform.entities.Stream;
import dev.misfit.StreamingPlatform.entities.StreamSearch;
import dev.misfit.StreamingPlatform.entities.User;
import dev.misfit.StreamingPlatform.repositories.StreamRepository;
import dev.misfit.StreamingPlatform.repositories.StreamSearchRepository;
import dev.misfit.StreamingPlatform.repositories.UserRepository;
import dev.misfit.StreamingPlatform.services.StreamerService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class StreamerServiceImpl implements StreamerService {

    private final UserRepository userRepository;
    private final StreamRepository streamRepository;
    private final StreamSearchRepository searchRepository;

    @Value("${videos.path}")
    String videoPath;

    public StreamerServiceImpl(UserRepository userRepository, StreamRepository streamRepository, StreamSearchRepository searchRepository) {
        this.userRepository = userRepository;
        this.streamRepository = streamRepository;
        this.searchRepository = searchRepository;
    }

    @Override
    @Transactional
    public StartStreamResponse updateStreamMetaData(Long streamId, StartStreamRequest request, MultipartFile thumbnail, Long userId) {

        Stream streamInDb = streamRepository.findById(streamId)
                .orElseThrow(() -> new StreamNotFoundException("No such stream exists in DB"));
        StreamSearch streamInEs = searchRepository.findById(streamInDb.getId())
                .orElseThrow(() -> new StreamNotFoundException("No such stream exists in ES"));

        if (!streamInDb.getStreamer().getUserId().equals(userId) || !streamInEs.getStreamerId().equals(userId)) {
            throw new UnauthorizedUserException("User not authenticated to access this resource");
        }

        if (thumbnail == null || thumbnail.isEmpty()) {
            throw new StreamProcessingException("Thumbnail file is required");
        }

        String thumbnailOriginalFilename = thumbnail.getOriginalFilename();
        String outputFolder = videoPath + "/" + streamInDb.getStreamer().getUserId() + "/" + request.getStreamKey();
        new File(outputFolder).mkdirs();

        try {
            assert thumbnailOriginalFilename != null;
            Path path = Path.of(outputFolder, thumbnailOriginalFilename);
            Files.copy(thumbnail.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        } catch (Exception e) {
            throw new StreamProcessingException("Failed to save thumbnail", e);
        }
        String thumbnailPath = "/thumbnail/" + streamInDb.getStreamer().getUserId() + "/" + request.getStreamKey() + "/" + thumbnailOriginalFilename;

        streamInDb.setTitle(request.getTitle());
        streamInDb.setDescription(request.getDescription());
        streamInDb.getTags().addAll(request.getTags());
        streamInDb.setCategories(request.getCategories());
        streamInDb.setThumbnail(thumbnailPath);

        streamInEs.setTitle(request.getTitle());
        streamInEs.setDescription(request.getDescription());
        streamInEs.getTags().addAll(request.getTags());
        streamInEs.setCategories(request.getCategories());
        streamInEs.setThumbnail(thumbnailPath);

        streamRepository.save(streamInDb);
        searchRepository.save(streamInEs);

        return StartStreamResponse.builder()
                .streamId(streamInEs.getStreamerId())
                .title(streamInEs.getTitle())
                .description(streamInEs.getDescription())
                .url(streamInEs.getUrl())
                .status(streamInEs.getStatus())
                .startedAt(streamInEs.getStartedAt())
                .thumbnail(streamInEs.getThumbnail())
                .streamKey(null)
                .build();
    }

    @Override
    public Set<StreamerResponse> followersList(Long streamerId) {
        User user = userRepository.findById(streamerId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found exception"));
        return user.getFollowers().stream().map(this::convertToStreamResponse).collect(Collectors.toSet());
    }

    @Override
    public StreamerResponse watchedStreamList(Long streamerId) {
        return null;
    }

    @Override
    public Set<StreamerResponse> followingList(Long streamerId) {
        User user = userRepository.findById(streamerId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found exception"));
        return user.getFollowing().stream().map(this::convertToStreamResponse).collect(Collectors.toSet());
    }

    @Override
    public Set<StreamVideosResponse> likedStreams(Long streamerId) {
        User user = userRepository.findById(streamerId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found exception"));
        return user.getLikedStreams().stream().map(this::convertToStreamVideosResponse).collect(Collectors.toSet());
    }

    private StreamVideosResponse convertToStreamVideosResponse(Stream stream) {
        return StreamVideosResponse.builder()
                .id(stream.getId())
                .title(stream.getTitle())
                .description(stream.getDescription())
                .url(stream.getUrl())
                .status(stream.getStatus())
                .startedAt(stream.getStartedAt())
                .endedAt(stream.getEndedAt())
                .likes(stream.getLikes().size())
                .thumbnail(stream.getThumbnail())
                .tags(stream.getTags())
                .categories(stream.getCategories())
                .streamUserResponse(convertToStreamResponse(stream.getStreamer()))
                .build();
    }

    private StreamerResponse convertToStreamResponse(User follower) {
        return StreamerResponse.builder()
                .id(follower.getUserId())
                .profilePic(follower.getProfilePic())
                .name(follower.getName())
                .isFollowing(true)
                .build();
    }
}
