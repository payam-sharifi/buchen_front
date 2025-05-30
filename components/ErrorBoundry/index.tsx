'use client';
import React, { ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '#/redux/hooks';
import { clearError } from '#/redux/features/snackBarHandlerSlice';
import FailedMessage from '#/ui/component/SnackBar/FailedMessage';
import SuccessMessage from '#/ui/component/SnackBar/SuccessMessage';

const ErrorBoundary = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { hasError, message, status, isSuccess } = useAppSelector(
    (state) => state.snackBarHandlerSlice,
  );
  return (
    <>
      {children}
      {hasError && (
        <FailedMessage
          show={status}
          onClose={() => dispatch(clearError())}
          message={message}
        />
      )}
      {isSuccess && (
        <SuccessMessage
          show={status}
          onClose={() => dispatch(clearError())}
          message={message}
        />
      )}
    </>
  );
};
export default ErrorBoundary;
