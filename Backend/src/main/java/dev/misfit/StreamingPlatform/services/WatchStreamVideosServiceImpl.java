package dev.misfit.StreamingPlatform.services;

import dev.misfit.StreamingPlatform.entities.Stream;
import dev.misfit.StreamingPlatform.entities.User;
import dev.misfit.StreamingPlatform.io.StreamUserResponse;
import dev.misfit.StreamingPlatform.io.StreamVideosResponse;
import dev.misfit.StreamingPlatform.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WatchStreamVideosServiceImpl implements WatchStreamVideosService {

    private final UserRepository userRepository;

    public WatchStreamVideosServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public StreamUserResponse getStreamerDetails(Long streamerId) throws Exception {
        Optional<User> userOptional = userRepository.findById(streamerId);
        if (userOptional.isEmpty()){
            throw new Exception("User not found");
        }
        User user = userOptional.get();
        return convertToStreamUserResponse(user);
    }

    private StreamVideosResponse convertToStreamVideoResponse(Stream stream) {
        return StreamVideosResponse.builder()
                .id(stream.getId())
                .title(stream.getTitle())
                .description(stream.getDescription())
                .url(stream.getUrl())
                .isLive(stream.getIsLive())
                .startedAt(stream.getStartedAt())
                .endedAt(stream.getEndedAt())
                .likes(stream.getLikes())
                .build();
    }

    private StreamUserResponse convertToStreamUserResponse(User user) {
        List<StreamVideosResponse> streams = user.getStreams().stream().map(this::convertToStreamVideoResponse).toList();
        return StreamUserResponse.builder()
                .id(user.getUserId())
                .streamVideosResponse(streams)
                .email(user.getEmail())
                .name(user.getName())
                .profilePic(user.getProfilePic())
                .followers(user.getFollowers())
                .build();
    }
}
