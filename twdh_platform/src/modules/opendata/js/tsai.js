import DocuxmlFormer from './docuXML.js';
import axios from 'axios';


var result;
var filename_col, doc_content_col;
var metadata_cols, metatags_cols, original_cols;
var col_arr;
const crawler_col_name = "Original";

let tsainiancheng_mission5 = {
	processing(data, config) {
		let metatags_en = 0;
		filename_col = '';
		doc_content_col = '';
		metadata_cols = [];
		metatags_cols = [];
		col_arr = Object.keys(data[0]);
		

		build_metadata_cols(data, config);
		var corpusSetting = buildCorpusSetting(config);
		var good = dataFed2DocuXML(data, config);
		var tmp = {'metadata': corpusSetting[0], 'tag': corpusSetting[1]};
		corpusSetting = {};
		corpusSetting[config['corpus']] = tmp;
		convertToXMLtsai(good, corpusSetting);
		
		var obj1 = {name: "dbTitleForImport", value: config['db_name']};
		var obj2 = {value: result, name: "importedFiles[]", filename: "test.xml"};
		var DocuXML = [];
		DocuXML[0] = obj1;
		DocuXML["file"] = obj2;

		/*$.ajax({
			method: "POST",
			url: "saveDocuXML.php",
			data: {docuXML: result, filename: "DocuXML.xml"},
			async: false,
			success: function(response) {
				ret = response;
			},
			error: function(response) {
				ret = response;
			}
		});*/
		return DocuXML;
	}
};
export default tsainiancheng_mission5;

function build_metadata_cols(json, config) {
	let col;
	var doc_source_set = new Set(), original_set = new Set();
	var mapping = config['mapping'], doc_source_col = '';
	for (col of col_arr)
		if (mapping[col] == 'doc_source')
			doc_source_col = col;
	for (col of col_arr)
		if (col == crawler_col_name)
			for (let i = 0; i<json.length; i++) {
				if (json[i][col] != '' && !doc_source_set.has(json[i][doc_source_col]))
					for (const [key, value] of Object.entries(JSON.parse(json[i][crawler_col_name])))
						original_set.add(key);
				doc_source_set.add(json[i][doc_source_col]);
			}
		else if (mapping[col] == undefined)
			;
		else if (mapping[col].indexOf("metadata/")==0 || mapping[col].indexOf("metatags/")==0)
			metatags_cols.push(col);
		else if (mapping[col] == 'filename')
			filename_col = col;
		else if (mapping[col] == 'doc_content')
			doc_content_col = col;
		else if (mapping[col] != 'corpus')
			metadata_cols.push(col);
	metatags_cols = metatags_cols.concat(Array.from(original_set));
	original_cols = Array.from(original_set);
	config["mapping"] = {...config["mapping"], ...Array.from(original_set).reduce((a, v) => ({ ...a, [v]: "metadata/"+v}), {})};
	return 0;
}

function buildCorpusSetting(config) {
	var metadata = [], metatags = [];
	let col;
	metadata_cols.forEach(key => metadata.push({'name': config["mapping"][key], 'value': key, 'order': undefined}));
	for (col of metatags_cols)
		if (original_cols.includes(col))
			metatags.push({'name': "Udef_"+(config["mapping"][col].replace(/[\/\.：]/g, '_')), 'title': col});
		else
			metatags.push({'name': "Udef_"+config["mapping"][col].replace(/[\/\.：]/g, '_'), 'title': col});
	return [metadata, metatags]
}

function dataFed2DocuXML(json, config) {
	var good = [];
	for (let i = 0; i<json.length; i++) {
		var element = {'comments': [], 'content': json[i][doc_content_col], 'corpus': config['corpus'], 'events': [], 'filename': json[i][filename_col],
		'metadata': buildMetaDataList(json[i], config),	'metatags': buildMetaTagList(json[i], config), 'otherdata': [], 'udefmetadata': []};
		good.push(element);
	}
	var keys = Object.keys(json[0]);
	return good;
}

function buildMetaDataList(metadata_obj, config) {
	var metadata_list = [];
	var mapping = config["mapping"];
	var keys = Object.keys(metadata_obj);
	for (let col of metadata_cols)
		if (keys.indexOf(col) >= 0)
			metadata_list.push({'name': mapping[col], 'zhname': col, 'value': metadata_obj[col]});
		else
			metadata_list.push({'name': mapping[col], 'zhname': col, 'value': '-'});
	return metadata_list;
}

function buildMetaTagList(metatags_obj, config) {
	var metatags_list = [];
	var mapping = config["mapping"];
	var r = /\\u([\d\w]{4})/gi;
	
	for (const [key, value] of Object.entries(metatags_obj)) {
		var no_uni = decodeHtml(value);
		if (key == crawler_col_name && value)
			if (metatags_obj[key] == '')
				for (col of original_cols)
					metatags_list.push({'name': "Udef_"+(mapping[col].replace(/[\/\.：]/g, '_')), 'value': '', 'freq': undefined});
			else
				for (const [key_ori, value] of Object.entries(JSON.parse(metatags_obj[key])))
					value.toString().split(';').forEach(v => metatags_list.push({'name': "Udef_"+(mapping[key_ori].replace(/[\/\.：]/g, '_')), 'value': v, 'freq': undefined}));
		else if (mapping[key] != undefined && (mapping[key].indexOf('metadata/') == 0 || mapping[key].indexOf('metatags/') == 0))
			no_uni.split(';').forEach(v => metatags_list.push({'name': "Udef_"+mapping[key].replace(/[\/\.：]/g, '_'), 'value': v, 'freq': undefined}));
	}
	return metatags_list;
}

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

// [original] 的metatags編碼
function toHex(str) {
	var result = '';
	for (var i=0; i<str.length; i++) {
		result += str.charCodeAt(i).toString(16);
	}
	return result;
}

function readxlsx(inpdata, fmt) {
		function to_json(workbook) {
			var json_raw;
			
			workbook.SheetNames.forEach(function (sheetName) {
				var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
				var range = workbook.Sheets[sheetName]['!ref'].split(':')[1][0];
				for (var i = 65; i <= range.charCodeAt(0); i++) // 權移之記
					col_arr.push(workbook.Sheets[sheetName][String.fromCharCode(i)+'1'].v);
				if (roa.length > 0) {
					json_raw = roa;
				}
			});
			
			for (i=0; i<json_raw.length; i++) {
				var keys = Object.keys(json_raw[i]);
				const index = keys.indexOf(crawler_col_name);
				if (index > -1)
					keys.splice(index, 1);
				keys.forEach(key => json_raw[i][key] = json_raw[i][key].replaceAll('&', '&amp;').replaceAll('\"', '&quot;'));
			}
			
			return json_raw;
		}

		var workbook = XLSX.read(inpdata, { type: 'binary' });


		if (fmt === 'json') {
			return to_json(workbook);
		}
}

function convertToXMLtsai(_documents, _corpusSetting) {
	var xmlFormer = new DocuxmlFormer();
	var xml_docs = '', xml_corpus = '';

	// each document
	_documents.forEach((docObj, i) => {
		xml_docs += xmlFormer.formDoc(docObj);

		// send progress
	});

	// each corpus
	for (let name in _corpusSetting) {
		xml_corpus += xmlFormer.formCorpusMeta(name, _corpusSetting[name]);
	}
	
	result = '<?xml version="1.0"?>\n' + 
			xmlFormer.generateXML({
				name: 'ThdlPrototypeExport',
				br: true,

				value: xml_corpus + xmlFormer.generateXML({
						name: 'documents',
						br: true,
						value: xml_docs
					})
			});
}

