package dev.misfit.StreamingPlatform.services;

import dev.misfit.StreamingPlatform.DTO.StreamUserResponse;
import dev.misfit.StreamingPlatform.DTO.StreamVideosResponse;
import dev.misfit.StreamingPlatform.entities.Stream;
import dev.misfit.StreamingPlatform.entities.User;
import dev.misfit.StreamingPlatform.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class WatchStreamVideosServiceImpl implements WatchStreamVideosService {

    private final UserRepository userRepository;

    public WatchStreamVideosServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public StreamUserResponse getStreamerDetails(Long streamerId) throws Exception {
        Optional<User> userOptional = userRepository.findById(streamerId);
        if (userOptional.isEmpty()) {
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
                .likes(stream.getLikedByUser().stream().map(likedBy -> likedBy.getUserId()).collect(Collectors.toList()))
                .thumbnail(stream.getThumbnail())
                .views(stream.getViews())
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
                .likedStreams(user.getLikedStream().stream().map(likedStream -> likedStream.getId()).toList())
                .followers(user.getFollowers().stream().map(follower -> follower.getUserId()).collect(Collectors.toList()))
                .following(user.getFollowing().stream().map(following -> following.getUserId()).toList())
                .build();
    }
}
