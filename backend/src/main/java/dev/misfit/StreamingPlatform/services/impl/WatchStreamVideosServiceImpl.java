package dev.misfit.StreamingPlatform.services.impl;

import dev.misfit.StreamingPlatform.DTO.StreamVideosResponse;
import dev.misfit.StreamingPlatform.DTO.StreamerResponse;
import dev.misfit.StreamingPlatform.customExceptions.UserNotFoundException;
import dev.misfit.StreamingPlatform.entities.SearchUser;
import dev.misfit.StreamingPlatform.entities.StreamSearch;
import dev.misfit.StreamingPlatform.entities.User;
import dev.misfit.StreamingPlatform.repositories.SearchUserRepository;
import dev.misfit.StreamingPlatform.repositories.StreamRepository;
import dev.misfit.StreamingPlatform.repositories.StreamSearchRepository;
import dev.misfit.StreamingPlatform.repositories.UserRepository;
import dev.misfit.StreamingPlatform.services.WatchStreamVideosService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class WatchStreamVideosServiceImpl implements WatchStreamVideosService {

    private final UserRepository userRepository;
    private final StreamRepository streamRepository;
    private final SearchUserRepository searchUserRepository;
    private final StreamSearchRepository searchRepository;

    public WatchStreamVideosServiceImpl(UserRepository userRepository, StreamRepository streamRepository, SearchUserRepository searchUserRepository, StreamSearchRepository searchRepository) {
        this.userRepository = userRepository;
        this.streamRepository = streamRepository;
        this.searchUserRepository = searchUserRepository;
        this.searchRepository = searchRepository;
    }

    @Override
    public StreamerResponse getStreamerDetails(Long streamerId, Pageable pageable, Long userId) {
        User user = userRepository.findById(streamerId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        SearchUser searchUser = searchUserRepository.findById(user.getUserId())
                .orElseThrow(() -> new UserNotFoundException("User not found in ES"));

//        Page<Stream> pagedStream = streamRepository.findByStreamer_UserId(streamerId, pageable);
        Page<StreamSearch> pagedStreamInES = searchRepository.findByStreamerId(streamerId, pageable);

//        Page<StreamVideosResponse> streamResponses = pagedStream.map(this::convertToStreamVideoResponse);
        Page<StreamVideosResponse> map = pagedStreamInES.map(this::convertToStreamVideoResponse);


//        return StreamerResponse.builder()
//                .id(user.getUserId())
////                .email(user.getEmail())
//                .name(user.getName())
//                .profilePic(user.getProfilePic())
////                .likedStreams(user.getLikedStreams().stream().map(likedStream -> likedStream.getId()).collect(Collectors.toSet()))
//                .followers(user.getFollowers().stream().map(User::getUserId).collect(Collectors.toSet()))
//                .following(user.getFollowing().stream().map(User::getUserId).collect(Collectors.toSet()))
//                .streamVideosResponse(streamResponses)
//                .build();

        return StreamerResponse.builder()
                .id(searchUser.getId())
                .name(searchUser.getName())
                .profilePic(searchUser.getProfilePic())
                .followersCount(searchUser.getFollowersCount())
                .isFollowing(searchUser.getFollowers().contains(userId))
                .streamVideosResponse(map)
                .build();
    }

    private StreamVideosResponse convertToStreamVideoResponse(StreamSearch stream) {
        return StreamVideosResponse.builder()
                .id(stream.getId())
                .title(stream.getTitle())
                .description(stream.getDescription())
                .url(stream.getUrl())
                .status(stream.getStatus())
                .startedAt(stream.getStartedAt())
                .endedAt(stream.getEndedAt())
                .likes(stream.getLikesCount())
                .thumbnail(stream.getThumbnail())
                .categories(stream.getCategories())
                .tags(stream.getTags())
                .build();
    }

//    private StreamVideosResponse convertToStreamVideoResponse(Stream stream) {
//        return StreamVideosResponse.builder()
//                .id(stream.getId())
//                .title(stream.getTitle())
//                .description(stream.getDescription())
//                .url(stream.getUrl())
//                .status(stream.getStatus())
//                .startedAt(stream.getStartedAt())
//                .endedAt(stream.getEndedAt())
//                .likes(stream.getLikes().stream().map(likedBy -> likedBy.getUserId()).collect(Collectors.toSet()))
//                .thumbnail(stream.getThumbnail())
//                .watchers(stream.getWatchers().stream().map(viewers -> viewers.getUserId()).collect(Collectors.toSet()))
//                .categories(stream.getCategories())
//                .tags(stream.getTags())
//                .build();
//    }

//    private StreamerResponse convertToStreamUserResponse(User user) {
//        Set<StreamVideosResponse> streams = user.getStreams().stream().map(this::convertToStreamVideoResponse).collect(Collectors.toSet());
//        return StreamerResponse.builder()
//                .id(user.getUserId())
//                .streamVideosResponse(streams)
//                .email(user.getEmail())
//                .name(user.getName())
//                .profilePic(user.getProfilePic())
//                .likedStreams(user.getLikedStreams().stream().map(likedStream -> likedStream.getId()).collect(Collectors.toSet()))
//                .followers(user.getFollowers().stream().map(follower -> follower.getUserId()).collect(Collectors.toSet()))
//                .following(user.getFollowing().stream().map(following -> following.getUserId()).collect(Collectors.toSet()))
//                .build();
//    }
}
