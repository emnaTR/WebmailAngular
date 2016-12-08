/**
 * Created by badre on 05/12/2016.
 */
myApp.filter('trusted', function($sce){
    return function(html){
        return $sce.trustAsHtml(html)
    }
});

myApp.directive("richtext", function() {
    return {
        restrict: 'A',
        scope: {
            'model': '='
        },
        compile: function (elem, attrs) {
            return function (scope, elem, attrs) {
                console.log(attrs.class);
                $("#" + attrs.id).jqte({
                    change: function () {
                        scope.$apply(function () {
                            scope.model = $(".jqte_editor").jqteVal();
                            console.log($("#" + attrs.id).jqteVal());
                        });
                        console.log(scope.model);
                    }
                });


                scope.$watch('model', function (newVal) {
                    console.log(newVal);

                });
            }


        }
    }

});
