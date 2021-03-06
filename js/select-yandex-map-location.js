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
 * @param {string} options.address Search address
 * @param {number} options.latitude Marker coordinates
 * @param {number} options.longitude Marker coordinates
 */
(function ($) {
    $.fn.selectLocation = function (options) {
        var self = this;

        ymaps.ready(function () {
            var myMap = new ymaps.Map($(self).get(0), {
                center: [59.22, 39.89],
                zoom: 12,
                controls: []
            });

            // Создаем экземпляр класса ymaps.control.SearchControl
            var mySearchControl = new ymaps.control.SearchControl({
                options: {
                    noPlacemark: true
                }
            });

            // Результаты поиска будем помещать в коллекцию.
            var mySearchResults = new ymaps.GeoObjectCollection(null, {
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
                    mySearchResults.removeAll();
                    mySearchResults.add(res);
                    setLatLngAttributes(res);
                    setAddress(res);
                });
            }).add('submit', function () {
                mySearchResults.removeAll();
            });

            var defaults = {
                'lat': $(options.latitude).val(),
                'lng': $(options.longitude).val(),
                'text': $(options.address).val()
            };
            if (defaults.lat && defaults.lng) {
                var center = [defaults.lng, defaults.lat];
                var mark = createMark(center, defaults.text);
                myMap.setCenter(center);
                mySearchResults.removeAll();
                mySearchResults.add(mark);
                setLatLngAttributes(mark);
            }
        });

        var setLatLngAttributes = function (point) {
            var coords = point.geometry.getCoordinates();
            $(options.latitude).val(coords[1]);
            $(options.longitude).val(coords[0]);
        };

        var createMark = function (coords, text) {
            return new ymaps.Placemark(coords, {
                balloonContentHeader: text
            });
        };

        var setAddress = function(searchResult){
           $(options.address).val(
               searchResult.properties._data.text
           );

        };

    };
})(jQuery);