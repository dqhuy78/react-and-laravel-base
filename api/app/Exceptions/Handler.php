<?php
// phpcs:ignoreFile
// @codeCoverageIgnoreStart
namespace App\Exceptions;

use Throwable;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Exceptions\PostTooLargeException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Throwable  $exception
     * @return void
     */
    public function report(Throwable $exception)
    {
        if (config('app.env') === 'production' && app()->bound('sentry') && $this->shouldReport($exception)) {
            app('sentry')->captureException($exception);
        }
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Throwable $exception)
    {
        if (config('app.env') === 'production') {
            switch ($exception) {
                case ($exception instanceof PostTooLargeException):
                    return response()->json([
                        'message' => __('Post data too large'),
                        'code' => 900,
                    ], 422);
                case ($exception instanceof NotFoundHttpException):
                    return response()->json([
                        'message' => __('API end point not found'),
                        'code' => 901,
                    ], 400);
                case ($exception instanceof MethodNotAllowedHttpException):
                    return response()->json([
                        'message' => __('Method not allow'),
                        'code' => 902,
                    ], 405);
                case ($exception instanceof UnauthorizedHttpException):
                    return response()->json([
                        'message' => __('Authenticate is required'),
                        'code' => 903,
                    ], 401);
                case ($exception instanceof AuthorizationException):
                    return response()->json([
                        'message' => __('Action forbidden'),
                        'code' => 904,
                    ], 403);
                case ($exception instanceof ModelNotFoundException):
                    return response()->json([
                        'message' => __('Data not found'),
                        'code' => 905,
                    ], 404);
                case ($exception instanceof ValidationException):
                    return response()->json([
                        'message' => __('Invalid data'),
                        'code' => 906,
                        'detail' => $exception->errors(),
                    ], 442);
                case ($exception instanceof HttpException):
                    return response()->json([
                        'message' => __('Internal server error'),
                        'code' => 907,
                    ], 500);
                case ($exception instanceof QueryException):
                    return response()->json([
                        'message' => __('Data query error'),
                        'code' => 908,
                    ], 500);
                default:
                    return response()->json([
                        'message' => __('Unknown error'),
                        'code' => 909,
                    ], $exception->getCode() ?: 500);
            }
        } else {
            return parent::render($request, $exception);
        }
    }
}
