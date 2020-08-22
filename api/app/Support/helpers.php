<?php

use Illuminate\Support\HtmlString;

if (!function_exists('webpack')) {
    /**
     * @param  string $path
     * @return string
     */
    function webpack(string $path)
    {
        $manifestPath = public_path('assets/webpack/manifest.json');
        if (!file_exists($manifestPath)) {
            throw new Exception('Manifest file not found. Try building the web bundles first.');
        }

        $manifest = json_decode(file_get_contents($manifestPath), true);
        if (!isset($manifest[$path])) {
            throw new Exception("Path \"{$path}\" not found in manifest.json.");
        }

        return new HtmlString("{$manifest[$path]}");
    }
}

if (!function_exists('webpack_file_exists')) {
    function webpack_file_exists(string $path)
    {
        try {
            webpack($path);

            return true;
        } catch (Exception $e) {
            return false;
        }
    }
}

if (!function_exists('args')) {
    /**
     * @param  array $options
     * @param  array $names
     * @return void
     */
    function args($options, $names)
    {
        return array_map(function ($name) use ($options) {
            return array_get($options, $name, null);
        }, $names);
    }
}
