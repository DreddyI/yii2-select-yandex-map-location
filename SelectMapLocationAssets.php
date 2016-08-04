<?php
namespace sokoji\maplocation;

use yii\web\AssetBundle;

/**
 * SelectMapLocationWidget assets class
 *
 * @author Max Kalyabin <maksim@kalyabin.ru>, Kirill Arutyunov <kirill@arutyunov.me>
 * @package yii2-select-yandex-map-location
 * @copyright (c) 2016, Max Kalyabin, http://github.com/kalyabin & Kirill Arutyunov https://github.com/sokoji
 */
class SelectMapLocationAssets extends AssetBundle
{
    public $sourcePath = '@vendor/sokoji/yii2-select-yandex-map-location/js';
    public $css = [];
    public $js = [
        'select-yandex-map-location.js',
    ];
    public $depends = [
        'yii\web\YiiAsset',
    ];

    /**
     * @inheritdoc
     */
    public static function register($view)
    {
        /* @var $view \yii\web\View */
        $view->registerJsFile('https://api-maps.yandex.ru/2.1/?lang=ru_RU'); //TODO: set language manually
        return parent::register($view);
    }
}
