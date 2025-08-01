package dev.misfit.StreamingPlatform.services;

import dev.misfit.StreamingPlatform.entities.Stream;
import dev.misfit.StreamingPlatform.entities.User;
import dev.misfit.StreamingPlatform.io.StreamUserResponse;
import dev.misfit.StreamingPlatform.io.StreamVideosResponse;
import dev.misfit.StreamingPlatform.repositories.StreamRepository;
import dev.misfit.StreamingPlatform.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StreamVideosServiceImpl implements StreamVideosService {

    private final StreamRepository streamRepository;
    private final UserRepository userRepository;

    public StreamVideosServiceImpl(StreamRepository streamRepository, UserRepository userRepository) {
        this.streamRepository = streamRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<StreamVideosResponse> getActiveStreams() {
        return streamRepository
                .findAll()
                .stream()
                .filter(Stream::getIsLive)
                .map(this::convertToStreamVideoResponse)
                .toList();
    }

    @Override
    public List<StreamVideosResponse> getStreamedVideos() {
        return streamRepository
                .findAll()
                .stream()
                .map(this::convertToStreamVideoResponse)
                .toList();
    }

    @Override
    public Integer addLikes(Long streamId, boolean like) throws Exception {
        Optional<Stream> streamOptional = streamRepository.findById(streamId);
        if (streamOptional.isEmpty()) {
            throw new Exception("Stream not found. Id invalid");
        }
        Stream stream = streamOptional.get();
        if (like) {
            stream.setLikes(stream.getLikes() + 1);
            streamRepository.save(stream);
            return stream.getLikes();
        }
        if (!like && stream.getLikes() > 0) {
            stream.setLikes(stream.getLikes() - 1);
            streamRepository.save(stream);
            return stream.getLikes();
        }
        return stream.getLikes();
    }

    @Override
    public void follow(Long streamerId, boolean follow) throws Exception {

        Optional<User> userOptional = userRepository.findById(streamerId);
        if (userOptional.isEmpty()) {
            throw new Exception("User not found");
        }
        User streamer = userOptional.get();
        if (follow) {
            streamer.setFollowers(streamer.getFollowers() + 1);
            userRepository.save(streamer);
        }
        if (!follow && streamer.getFollowers() > 0) {
            streamer.setFollowers(streamer.getFollowers() - 1);
            userRepository.save(streamer);
        }
    }

    @Override
    public List<StreamUserResponse> topFollowedStreamers() {
        return userRepository
                .findAll()
                .stream()
                .sorted((a,b)-> b.getFollowers() - a.getFollowers())
                .map(this::convertToStreamUserResponse)
                .toList();
    }

    @Override
    public StreamVideosResponse watchStream(Long streamId) throws Exception {
        Optional<Stream> streamOptional = streamRepository.findById(streamId);
        if (streamOptional.isEmpty()) {
            throw new Exception("Stream not found");
        }
        Stream stream = streamOptional.get();
        return convertToStreamVideoResponse(stream);
    }


    private StreamVideosResponse convertToStreamVideoResponse(Stream stream) {
        StreamUserResponse user = convertToStreamUserResponse(stream.getStreamer());
        return StreamVideosResponse.builder()
                .id(stream.getId())
                .title(stream.getTitle())
                .description(stream.getDescription())
                .url(stream.getUrl())
                .isLive(stream.getIsLive())
                .startedAt(stream.getStartedAt())
                .endedAt(stream.getEndedAt())
                .likes(stream.getLikes())
                .streamUserResponse(user)
                .thumbnail(stream.getThumbnail())
                .build();
    }

    private StreamUserResponse convertToStreamUserResponse(User user) {
        return StreamUserResponse.builder()
                .streamVideosResponse(null)
                .email(user.getEmail())
                .id(user.getUserId())
                .name(user.getName())
                .profilePic(user.getProfilePic())
                .followers(user.getFollowers())
                .build();
    }
}
