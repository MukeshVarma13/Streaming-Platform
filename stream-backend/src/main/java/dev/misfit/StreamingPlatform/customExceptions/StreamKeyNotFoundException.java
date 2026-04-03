package dev.misfit.StreamingPlatform.customExceptions;

public class StreamKeyNotFoundException extends RuntimeException {
    public StreamKeyNotFoundException(String message) {
        super(message);
    }
}
