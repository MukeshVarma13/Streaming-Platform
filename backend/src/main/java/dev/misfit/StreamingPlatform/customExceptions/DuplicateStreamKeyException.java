package dev.misfit.StreamingPlatform.customExceptions;

public class DuplicateStreamKeyException extends RuntimeException {
    public DuplicateStreamKeyException(String message) {
        super(message);
    }
}
