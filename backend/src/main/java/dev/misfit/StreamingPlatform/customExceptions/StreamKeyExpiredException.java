package dev.misfit.StreamingPlatform.customExceptions;

public class StreamKeyExpiredException extends RuntimeException {
    public StreamKeyExpiredException(String message) {
        super(message);
    }
}
