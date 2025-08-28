package dev.misfit.StreamingPlatform.services;

import dev.misfit.StreamingPlatform.DTO.ChatResponse;
import dev.misfit.StreamingPlatform.DTO.StreamUserResponse;
import dev.misfit.StreamingPlatform.DTO.StreamVideosResponse;
import dev.misfit.StreamingPlatform.entities.ChatMessage;
import dev.misfit.StreamingPlatform.entities.Stream;
import dev.misfit.StreamingPlatform.entities.User;
import dev.misfit.StreamingPlatform.repositories.StreamRepository;
import dev.misfit.StreamingPlatform.repositories.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
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
    @Transactional
    public Integer addLikes(Long streamId, boolean like, Long userId) throws Exception {
        Stream stream = streamRepository.findById(streamId).orElseThrow(() -> new Exception("Stream not found!"));
        User user = userRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException("User not found from provided token"));
        if (like) {
            if (user.getLikedStream().stream().noneMatch(s -> s.getId().equals(stream.getId()))) {
                user.getLikedStream().add(stream);
            }
        } else {
            user.getLikedStream().removeIf(s -> s.getId().equals(stream.getId()));
        }
        userRepository.save(user);

        Stream updatedStream = streamRepository.findById(streamId).get();
        System.out.println(updatedStream.getLikedByUser().size());
        return updatedStream.getLikedByUser().size();
    }

    @Override
    @Transactional
    public void follow(Long streamerId, boolean follow, Long userId) throws Exception {

        User follower = userRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException("User not found!!"));
        User streamer = userRepository.findById(streamerId).orElseThrow(() -> new UsernameNotFoundException("Streamer not found!!"));
        if (follow) {
            streamer.getFollowers().add(follower);
            follower.getFollowing().add(streamer);
        } else {
            streamer.getFollowers().removeIf(u -> u.getUserId().equals(follower.getUserId()));
            follower.getFollowing().removeIf(u -> u.getUserId().equals(streamer.getUserId()));
        }
        userRepository.save(streamer);
        userRepository.save(follower);
    }

    @Override
    public List<StreamUserResponse> topFollowedStreamers() {
        return userRepository
                .findAll()
                .stream()
                .sorted((a, b) -> b.getFollowers().size() - a.getFollowers().size())
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

    @Override
    public List<ChatResponse> getChatMessages(Long streamId) throws Exception {
        Optional<Stream> optionalStream = streamRepository.findById(streamId);
        if (optionalStream.isEmpty()) {
            throw new Exception("Stream not found!!");
        }
        Stream stream = optionalStream.get();
        return stream.getMessages().stream().map(this::convertToChatResponse).toList();
    }

    @Override
    public StreamUserResponse getLoggedUser(Long userId, String email) throws Exception {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User Not found!!"));
        if (user.getUserId() != userId) {
            throw new Exception("Something went wrong");
        }
        return convertToStreamUserResponse(user);
    }

    @Override
    public List<StreamVideosResponse> searchInDescription(String find) {
        List<Stream> streams = streamRepository.findByDescriptionContaining(find);
        return streams.stream().map(this::convertToStreamVideoResponse).toList();
    }

    @Override
    public List<StreamVideosResponse> searchInTitle(String find) {
        List<Stream> streams = streamRepository.findByTitleContaining(find);
        return streams.stream().map(this::convertToStreamVideoResponse).toList();
    }

    @Override
    public List<StreamUserResponse> getStreamByUserName(String term) {
        List<User> users = userRepository.findByNameContaining(term);
        return users.stream().map(this::convertToStreamUserResponse).toList();
    }

    @Override
    public List<StreamVideosResponse> findByTags(String term) {
        List<Stream> streams = streamRepository.findByTagsIn(Collections.singleton(term));
        return streams.stream().map(this::convertToStreamVideoResponse).toList();
    }

    @Override
    public List<StreamVideosResponse> findByCategories(String term) {
        List<Stream> byCategoriesIn = streamRepository.findByCategoriesIn(Collections.singleton(term));
        return byCategoriesIn.stream().map(this::convertToStreamVideoResponse).toList();
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
        StreamUserResponse user = convertToStreamUserResponse(stream.getStreamer());
        return StreamVideosResponse.builder()
                .id(stream.getId())
                .title(stream.getTitle())
                .description(stream.getDescription())
                .url(stream.getUrl())
                .isLive(stream.getIsLive())
                .startedAt(stream.getStartedAt())
                .endedAt(stream.getEndedAt())
                .likes(stream.getLikedByUser().stream().map(likedBy -> likedBy.getUserId()).collect(Collectors.toList()))
                .streamUserResponse(user)
                .thumbnail(stream.getThumbnail())
                .views(stream.getViews())
                .categories(stream.getCategories())
                .tags(stream.getTags())
                .build();
    }

    private StreamUserResponse convertToStreamUserResponse(User user) {
        return StreamUserResponse.builder()
                .id(user.getUserId())
                .streamVideosResponse(null)
                .email(user.getEmail())
                .name(user.getName())
                .profilePic(user.getProfilePic())
                .followers(user.getFollowers().stream().map(follower -> follower.getUserId()).collect(Collectors.toList()))
                .following(user.getFollowing().stream().map(following -> following.getUserId()).toList())
                .build();
    }
}
