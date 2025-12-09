package dev.misfit.StreamingPlatform.services;

import dev.misfit.StreamingPlatform.DTO.ChatResponse;
import dev.misfit.StreamingPlatform.DTO.PageResponse;
import dev.misfit.StreamingPlatform.DTO.StreamVideosResponse;
import dev.misfit.StreamingPlatform.DTO.StreamerResponse;
import dev.misfit.StreamingPlatform.customExceptions.StreamNotFoundException;
import dev.misfit.StreamingPlatform.customExceptions.UserNotFoundException;
import dev.misfit.StreamingPlatform.entities.ChatMessage;
import dev.misfit.StreamingPlatform.entities.Stream;
import dev.misfit.StreamingPlatform.entities.User;
import dev.misfit.StreamingPlatform.repositories.StreamRepository;
import dev.misfit.StreamingPlatform.repositories.UserRepository;
import dev.misfit.StreamingPlatform.utils.StreamStatus;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StreamVideosServiceImpl implements StreamVideosService {

    private final StreamRepository streamRepository;
    private final UserRepository userRepository;

    public StreamVideosServiceImpl(StreamRepository streamRepository, UserRepository userRepository) {
        this.streamRepository = streamRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Cacheable(value = "streams-live", key = "#pageable.pageNumber + '-' + #pageable.pageSize")
    public PageResponse<StreamVideosResponse> getActiveStreams(Pageable pageable) {
        Page<Stream> pagedStreams = streamRepository.findAll(pageable);
        List<StreamVideosResponse> liveStreams = pagedStreams
                .stream()
                .filter(stream -> stream.getStatus().equals(StreamStatus.LIVE))
                .map(this::convertToStreamVideoResponse)
                .toList();

        return new PageResponse<>(liveStreams,
                pageable.getPageNumber(),
                pageable.getPageSize(),
                pagedStreams.getTotalElements());
    }

    @Override
    @Cacheable(value = "streamed-videos", key = "#pageable.pageNumber + '-' + #pageable.pageSize")
    public PageResponse<StreamVideosResponse> getStreamedVideos(Pageable pageable) {
        Page<Stream> pagedStreams = streamRepository.findAll(pageable);

        List<StreamVideosResponse> streams = pagedStreams
                .stream()
                .filter(stream -> stream.getStatus().equals(StreamStatus.ENDED))
                .map(this::convertToStreamVideoResponse)
                .toList();

        return new PageResponse<>(
                streams,
                pageable.getPageNumber(),
                pageable.getPageSize(),
                pagedStreams.getTotalElements()
        );
    }

    @Override
    @Transactional
    public Integer addLikes(Long streamId, boolean like, Long userId) {
        Stream stream = streamRepository.findById(streamId)
                .orElseThrow(() -> new StreamNotFoundException("Stream not found!"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found from the token"));

        if (like) {
            user.getLikedStreams().add(stream);
        } else {
            user.getLikedStreams().removeIf(s -> s.getId().equals(stream.getId()));
        }
        userRepository.save(user);

        return streamRepository.findById(streamId)
                .map(s -> s.getLikes().size())
                .orElse(0);
    }

    @Override
    @Transactional
    public void follow(Long streamerId, boolean follow, Long userId) {

        User follower = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        User streamer = userRepository.findById(streamerId)
                .orElseThrow(() -> new UserNotFoundException("Streamer not found"));

        if (follow) {
            streamer.getFollowers().add(follower);
            follower.getFollowing().add(streamer);
        } else {
            streamer.getFollowers().remove(follower);
            follower.getFollowing().remove(streamer);
        }

        userRepository.save(streamer);
        userRepository.save(follower);
    }

    @Override
    @Cacheable(value = "top-streamers", key = "#pageable.pageNumber + '-' + #pageable.pageSize")
    public PageResponse<StreamerResponse> topFollowedStreamers(Pageable pageable) {
        Page<User> pagedUsers = userRepository.findAll(pageable);
        List<StreamerResponse> sortedUsers = pagedUsers
                .getContent()
                .stream()
                .sorted((a, b) -> b.getFollowers().size() - a.getFollowers().size())
                .map(this::convertToStreamUserResponse)
                .toList();
        return new PageResponse<>(sortedUsers,
                pageable.getPageNumber(),
                pageable.getPageSize(),
                pagedUsers.getTotalElements());
    }

    @Override
    @Cacheable(value = "watch-stream", key = "#streamId")
    public StreamVideosResponse watchStream(Long streamId) {
        Stream stream = streamRepository.findById(streamId)
                .orElseThrow(() -> new StreamNotFoundException("Stream not found"));
        return convertToStreamVideoResponse(stream);
    }

    @Override
    @Cacheable(value = "stream-msg", key = "#streamId")
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

    @Override
    public PageResponse<StreamVideosResponse> searchInDescription(String find, Pageable pageable) {
        Page<Stream> streams = streamRepository.findByDescriptionContaining(find, pageable);
        List<StreamVideosResponse> videosResponseList = streams
                .stream()
                .map(this::convertToStreamVideoResponse)
                .toList();

        return new PageResponse<>(videosResponseList,
                pageable.getPageNumber(),
                pageable.getPageSize(),
                streams.getTotalElements());
    }

    @Override
    public PageResponse<StreamVideosResponse> searchInTitle(String find, Pageable pageable) {
        Page<Stream> streams = streamRepository.findByTitleContaining(find, pageable);
        List<StreamVideosResponse> videosResponseList = streams
                .stream()
                .map(this::convertToStreamVideoResponse)
                .toList();

        return new PageResponse<>(videosResponseList,
                pageable.getPageNumber(),
                pageable.getPageSize(),
                streams.getTotalElements());
    }

    @Override
    public PageResponse<StreamerResponse> getStreamByUserName(String term, Pageable pageable) {
        Page<User> users = userRepository.findByNameContaining(term, pageable);
        List<StreamerResponse> streamerResponses = users
                .stream()
                .map(this::convertToStreamUserResponse)
                .toList();

        return new PageResponse<>(streamerResponses,
                pageable.getPageNumber(),
                pageable.getPageSize(),
                users.getTotalElements());
    }

    @Override
    public PageResponse<StreamVideosResponse> findByTags(String term, Pageable pageable) {
        Page<Stream> streamByTags = streamRepository.findByTagsIn(Collections.singleton(term), pageable);
        List<StreamVideosResponse> videosResponseList = streamByTags
                .stream()
                .map(this::convertToStreamVideoResponse)
                .toList();

        return new PageResponse<>(videosResponseList,
                pageable.getPageNumber(),
                pageable.getPageSize(),
                streamByTags.getTotalElements());
    }

    @Override
    public PageResponse<StreamVideosResponse> findByCategories(String term, Pageable pageable) {
        Page<Stream> pagedCategory = streamRepository.findByCategoriesIn(Collections.singleton(term), pageable);
        List<StreamVideosResponse> videosResponseList = pagedCategory
                .stream()
                .map(this::convertToStreamVideoResponse)
                .toList();

        return new PageResponse<>(videosResponseList,
                pageable.getPageNumber(),
                pageable.getPageSize(),
                pagedCategory.getTotalElements());
    }

//    public List<StreamVideosResponse> search(String find) {
//        List<Stream> streams = streamRepository.findInDescription(find);
//        List<Stream> streams = streamRepository.findByDescriptionContaining(find);
//        List<Stream> streams = streamRepository.findByTitleContaining(find);
//        return streams.stream().map(this::convertToStreamVideoResponse).toList();
//    }

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
                .likes(stream.getLikes().stream().map(likedBy -> likedBy.getUserId()).collect(Collectors.toSet()))
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
                .followers(user.getFollowers().stream().map(follower -> follower.getUserId()).collect(Collectors.toSet()))
                .following(user.getFollowing().stream().map(following -> following.getUserId()).collect(Collectors.toSet()))
                .build();
    }
}
