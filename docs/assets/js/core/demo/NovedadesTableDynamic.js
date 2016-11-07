(function(namespace, $) {
	"use strict";

	var DemoTableDynamic = function() {
		// Create reference to this instance
		var o = this;
		// Initialize app when document is ready
		$(document).ready(function() {
			o.initialize();
		});

	};
	var p = DemoTableDynamic.prototype;

	// =========================================================================
	// INIT
	// =========================================================================

	p.initialize = function() {
		this._initDataTables();
	};

	// =========================================================================
	// DATATABLES
	// =========================================================================

	p._initDataTables = function() {
		if (!$.isFunction($.fn.dataTable)) {
			return;
		}

		// Init the demo DataTables
		this._createDataTable1();
		this._createDataTable2();
	};

	p._createDataTable1 = function() {
		$('#datatable1').DataTable({
			"dom": 'lCfrtip',
			"order": [],
			"colVis": {
				"buttonText": "Columns",
				"overlayFade": 0,
				"align": "right"
			},
			"language": {
				"lengthMenu": '_MENU_ registros por página',
				"search": '<i class="fa fa-search"></i>',
				"paginate": {
					"previous": '<i class="fa fa-angle-left"></i>',
					"next": '<i class="fa fa-angle-right"></i>'
				}
			}
		});

		$('#datatable1 tbody').on('click', 'tr', function() {
			$(this).toggleClass('selected');
		});
	};

	p._createDataTable2 = function() {
		loadCredentials();
		var table = $('#datatable2').DataTable({
			"dom": 'T<"clear">lfrtip',
			"ajax": {
				url: URL_HOME + '/aportantes/' + USER.idAportante + '/pensionados',
				dataSrc: ''
			},
			"columns": [
				{
					"class": 'details-control',
					"orderable": false,
					"data": null,
					"defaultContent": ''
				},
				{"data": "pk"},
				{"data": "nombre"},
				{"data": "edad"},
				{"data": "codigo_CIU"}
			],
			"tableTools": {
				"sSwfPath": $('#datatable2').data('swftools')
			},
			"order": [[1, 'asc']],
			"language": {
				"lengthMenu": '_MENU_ registros por página',
				"search": '<i class="fa fa-search"></i>',
				"paginate": {
					"previous": '<i class="fa fa-angle-left"></i>',
					"next": '<i class="fa fa-angle-right"></i>'
				}
			}
		});
		
		//Add event listener for opening and closing details
		var o = this;
		$('#datatable2 tbody').on('click', 'td.details-control', function() {
			var tr = $(this).closest('tr');
			var row = table.row(tr);

			if (row.child.isShown()) {
				// This row is already open - close it
				row.child.hide();
				tr.removeClass('shown');
			}
			else {
				// Open this row
				row.child(o._formatDetails(row.data())).show();
				tr.addClass('shown');
			}
		});
	};

	// =========================================================================
	// DETAILS
	// =========================================================================

	p._formatDetails = function(d) {
		// `d` is the original data object for the row

		var novedades = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
			'<tr>' +
			'<td></td>' +
			'<td><a href="crear-novedad.html?id=' + d.pk + '" style="font-weight: bold; color: #7eb73d;">Crear</a></td>' +
			'</tr>';

		if (d.novedades){
			for(var i = 0; i < d.novedades.length; i++){
				novedades += '<tr>' +
				'<td>Novedad No:</td>' +
				'<td>' + (i + 1) + '</td>' +
				'</tr>' +
				'<tr>' +
				'<td>Fecha inicio:</td>' +
				'<td>' + d.novedades[i].fecha_inicio + '</td>' +
				'</tr>' +
				'<tr>' +
				'<td>Fecha fin:</td>' +
				'<td>' + d.novedades[i].fecha_fin + '</td>' +
				'</tr>' +
				'<tr>' +
				'<td>Duracion:</td>' +
				'<td>' + d.novedades[i].duracion + '</td>' +
				'</tr>' +
				'<tr>' +
				'<td>Tipo:</td>' +
				'<td>' + d.novedades[i].tipo + '</td>' +
				'</tr>' +
				'<tr>' +
				'<td>Acciones:</td>' +
				'<td><a href="actualizar-novedad.html?id=' + d.novedades[i].pk + '" style="font-weight: bold; color: #7eb73d;">Actualizar</a>  <a href="#" onclick="eliminarNovedad(' + d.novedades[i].pk + ')" style="font-weight: bold; color: #6c0020;">Eliminar</a></td>' +
				'</tr>' +
				'<tr><td>------------------</td></tr>';
			}
		}

		novedades += '</table>';
		return novedades;
	};

	// =========================================================================
	namespace.DemoTableDynamic = new DemoTableDynamic;
}(this.materialadmin, jQuery)); // pass in (namespace, jQuery):
