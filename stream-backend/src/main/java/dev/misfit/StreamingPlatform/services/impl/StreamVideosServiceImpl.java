package dev.misfit.StreamingPlatform.services.impl;

import dev.misfit.StreamingPlatform.DTO.ChatResponse;
import dev.misfit.StreamingPlatform.DTO.PageResponse;
import dev.misfit.StreamingPlatform.DTO.StreamVideosResponse;
import dev.misfit.StreamingPlatform.DTO.StreamerResponse;
import dev.misfit.StreamingPlatform.customExceptions.StreamNotFoundException;
import dev.misfit.StreamingPlatform.customExceptions.UserNotFoundException;
import dev.misfit.StreamingPlatform.entities.*;
import dev.misfit.StreamingPlatform.repositories.SearchUserRepository;
import dev.misfit.StreamingPlatform.repositories.StreamRepository;
import dev.misfit.StreamingPlatform.repositories.StreamSearchRepository;
import dev.misfit.StreamingPlatform.repositories.UserRepository;
import dev.misfit.StreamingPlatform.services.StreamVideosService;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StreamVideosServiceImpl implements StreamVideosService {

    private final StreamRepository streamRepository;
    private final UserRepository userRepository;
    private final StreamSearchRepository searchRepository;
    private final SearchUserRepository searchUserRepository;

    public StreamVideosServiceImpl(StreamRepository streamRepository, UserRepository userRepository, StreamSearchRepository searchRepository, SearchUserRepository searchUserRepository) {
        this.streamRepository = streamRepository;
        this.userRepository = userRepository;
        this.searchRepository = searchRepository;
        this.searchUserRepository = searchUserRepository;
    }

    @Override
    @Transactional
    public Long addLikes(Long streamId, boolean like, Long userId) {
        Stream stream = streamRepository.findById(streamId)
                .orElseThrow(() -> new StreamNotFoundException("Stream not found in DB!"));
        StreamSearch streamInES = searchRepository.findById(streamId)
                .orElseThrow(() -> new StreamNotFoundException("Stream not found in ES!"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found from the token"));

        if (like) {
            user.getLikedStreams().add(stream);
        } else {
            user.getLikedStreams().removeIf(s -> s.getId().equals(stream.getId()));
        }
        int likesCount =stream.getLikes().size();
        streamInES.setLikesCount(likesCount);
        userRepository.save(user);
        searchRepository.save(streamInES);
        return (long) likesCount;
    }

    @Override
    @Transactional
    public void follow(Long streamerId, boolean follow, Long userId) {

        User follower = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        SearchUser followerInES = searchUserRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found in ES"));

        User streamer = userRepository.findById(streamerId)
                .orElseThrow(() -> new UserNotFoundException("Streamer not found"));

        SearchUser streamerInES = searchUserRepository.findById(streamerId)
                .orElseThrow(() -> new UserNotFoundException("Streamer not found in ES"));

        if (follow) {
            streamer.getFollowers().add(follower);
            follower.getFollowing().add(streamer);
            streamerInES.getFollowers().add(followerInES.getId());
        } else {
            streamer.getFollowers().remove(follower);
            follower.getFollowing().remove(streamer);
            streamerInES.getFollowers().remove(followerInES.getId());
        }

        streamerInES.setFollowersCount(streamer.getFollowers().size());
        searchUserRepository.save(streamerInES);
        userRepository.save(streamer);
        userRepository.save(follower);
    }

    //    @Cacheable(value = "stream-msg", key = "#streamId", unless = "#result.isEmpty()")
    @Override
    public List<ChatResponse> getChatMessages(Long streamId) {
        Stream stream = streamRepository.findById(streamId)
                .orElseThrow(() -> new StreamNotFoundException("Stream not found"));
        return stream.getMessages().stream()
                .map(this::convertToChatResponse)
                .toList();
    }

    @Override
    @Cacheable(value = "logged-user", key = "#userId")
    public StreamerResponse getLoggedUser(Long userId, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User Not found"));
        if (!user.getUserId().equals(userId)) {
            throw new UserNotFoundException("User mismatch");
        }
        return convertToStreamUserResponse(user);
    }


    private ChatResponse convertToChatResponse(ChatMessage message) {
        return ChatResponse.builder()
                .id(message.getId())
                .content(message.getContent())
                .userName(message.getUser().getName())
                .userProfile(message.getUser().getProfilePic())
                .build();
    }


    private StreamVideosResponse convertToStreamVideoResponse(Stream stream) {
        StreamerResponse user = convertToStreamUserResponse(stream.getStreamer());
        return StreamVideosResponse.builder()
                .id(stream.getId())
                .title(stream.getTitle())
                .description(stream.getDescription())
                .url(stream.getUrl())
                .status(stream.getStatus())
                .startedAt(stream.getStartedAt())
                .endedAt(stream.getEndedAt())
                .likes(stream.getLikes().size())
                .watchers(stream.getWatchers().stream().map(viewers -> viewers.getUserId()).collect(Collectors.toSet()))
                .streamUserResponse(user)
                .thumbnail(stream.getThumbnail())
                .categories(stream.getCategories())
                .tags(new ArrayList<>(stream.getTags()))
                .build();
    }

    private StreamerResponse convertToStreamUserResponse(User user) {
        return StreamerResponse.builder()
                .id(user.getUserId())
                .streamVideosResponse(null)
                .email(user.getEmail())
                .name(user.getName())
                .profilePic(user.getProfilePic())
                .followersCount(user.getFollowers().size())
//                .following(user.getFollowing().stream().map(following -> following.getUserId()).collect(Collectors.toSet()))
                .build();
    }
}
