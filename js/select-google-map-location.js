/**
 * Выбор местоположения - виджет.
 * Виджет запоминает координаты при вводе адреса в инпут и отображает карту Google.
 * Необходимо передавать опции:
 * - address - селектор, для указания адреса;
 * - latitude - селектор для указания широты;
 * - longitude - селектор для указания долготы;
 * - hideMarker - если определено, то не будет установлен маркер на карте при поиске локации;
 * - onLoadMap - если определена функциия, то она будет вызвана при инициализации карты;
 * - addressNotFound - сообщение о не найденном адресе.
 *
 * @param {Object}  options
 * @param {boolean} options.draggable Marker draggable Option
 * TODO: describe other options here
 */
(function($) {
    $.fn.selectLocation = function(options) {
        var self = this;
        var map;

        ymaps.ready(function () {
            var myMap = new ymaps.Map('map', {
                    center: [59.22, 39.89],
                    zoom: 12,
                    controls: []
                }),
                // Создаем экземпляр класса ymaps.control.SearchControl
                mySearchControl = new ymaps.control.SearchControl({
                    options: {
                        noPlacemark: true
                    }
                }),
                // Результаты поиска будем помещать в коллекцию.
                mySearchResults = new ymaps.GeoObjectCollection(null, {
                    hintContentLayout: ymaps.templateLayoutFactory.createClass('$[properties.name]')
                });
            myMap.controls.add(mySearchControl);
            myMap.geoObjects.add(mySearchResults);
            // При клике по найденному объекту метка становится красной.
            mySearchResults.events.add('click', function (e) {
                e.get('target').options.set('preset', 'islands#redIcon');
            });
            // Выбранный результат помещаем в коллекцию.
            mySearchControl.events.add('resultselect', function (e) {
                var index = e.get('index');
                mySearchControl.getResult(index).then(function (res) {
                    mySearchResults.add(res);
                });
            }).add('submit', function () {
                mySearchResults.removeAll();
            })
        });
    };
})(jQuery);