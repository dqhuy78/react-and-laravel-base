<p align="center"><img src="https://res.cloudinary.com/dtfbvvkyp/image/upload/v1566331377/laravel-logolockup-cmyk-red.svg" width="400"></p>

## 1. About This Repository

This repository include some custom config for making a SPA with ReactJS (Session-Cookie base). For detail please watch file `app\Support\helpers.php`.

## 2. Change

Some part of this repository is different from the origin Laravel install. Detail:
- **Change exception hanlder**: exception handler now have custom output base on env (Detail: `app\Exceptions\Handler.php`).
- **Sentry include**: include sentry config for production env (Detail: `app\Exceptions\Handler.php`).
- **SPA auth data**: Auto submit authenticate user data to front-end (Detail: `app\Http\Controllers\RenderWebView.php`).
- **Serve SPA page**: Default blade file for working with ReactJS (Detail: `resources\views\spa.blade.php`)
- **Resource update**: change default Laravel resource to update meta data key to `camelCase`.

```php
// Default resource ouput
[
    'meta' => [
        'current_page' => 1,
        'per_page' => 15,
        'total' => 30,
    ]
]

// Update resource output
[
    'meta' => [
        'currentPage' => 1,
        'perPage' => 15,
        'total' => 30,
    ]
]

```

When ever you create a new resource with:

```bash
php artisan make:resource PostResource
```

Please update it like this:

```php
// Default resource
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource {}

// Update resource
use App\Http\Resources\Custom\ShareResource;

class PostResource extends ShareResource {}
```

- **Repository struct**: include default repository structure for `User` model.
- **Repository generate**: you can create a full-repository struct for each model with custom command in `app\Console\Commands\`. Example for create full-repository struct for Post model you can use following command:

```bin
php artisan repository:generate Post

=> ouput:
Generate repository struct success, please copy the code below to your Providers/RepositoryServiceProvider.php
    'Post' => [
        \App\Repositories\Contracts\PostRepositoryInterface::class,
        \App\Repositories\Impl\PostRepository::class,
    ]

```
Just copy the output to `protected $repositories` in `app\Providers/RepositoryServiceProvider.php` and you are good to go.
