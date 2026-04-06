package dev.misfit.StreamingPlatform.customExceptions;

public class ChannelNotFoundException extends RuntimeException {
    public ChannelNotFoundException(String message) {
        super(message);
    }
}
