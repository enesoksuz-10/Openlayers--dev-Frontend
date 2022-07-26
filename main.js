const raster = new ol.layer.Tile({
    source: new ol.source.OSM(),
});

const kaynak = new ol.source.Vector();
var drawtype = "Point";

const vector = new ol.layer.Vector({
    source: kaynak,
    style: new ol.style.Style({
        fill: new ol.style.Fill({ //polygon icin
            color: 'rgba(255, 255, 255, 0.5)',
        }),
        stroke: new ol.style.Stroke({ //dis cizgiler icin
            color: 'red',
            width: 2,
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({ //point icin
                color: '#ffcc33',
            }),
        }),
    }),
});
let draw, snap;
const modify = new ol.interaction.Modify({ source: kaynak });

var map = new ol.Map({
    target: 'map',
    layers: [raster, vector],
    view: new ol.View({
        center: ol.proj.fromLonLat([37.41, 8.82]),
        zoom: 0
    })
});
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

function addInteractions(drawtype) {
    map.getInteractions().pop();
    draw = new ol.interaction.Draw({
        source: kaynak,
        type: drawtype,
    });
    map.addInteraction(draw);
    draw.on('drawend', function (evt) {
        modal.style.display = "block";
    })
}
function DrawTypeSelect(sel) {
    drawtype = sel.value;
    if (drawtype != "")
        addInteractions(drawtype);

}
addInteractions(drawtype);
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
