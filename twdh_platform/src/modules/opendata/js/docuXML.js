/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	This file defined classes that manipulate DocuXML.	
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


// ------------------------- functions ---------------------------


// remove special charactor in start or end position of string
// char: string, charactor that want to trim
// return str, string, trimmed String
String.prototype.trim = function(char) {
	
	// trim user defined char
	if (char) return this.replace(new RegExp(`^[\\${ char }]+|[\\${ char }]+$`, 'g'), '');

	// trim space left and right
	else return this.replace(/^\s+|\s+$/g, '');
};


// replace tags in string
// tagName: string, tag that want to replace/remove
// replaceStr: string, replace to this string
// return str, string, replaced string
String.prototype.replaceTag = function(tagName, replaceStr) {
	var str = (replaceStr) ?replaceStr :'';

	// specific tag
	if (tagName) return this.replace(new RegExp(`<[\s\/]*?${ tagName }.*?>`, 'g'), str);

	// all tag
	else return this.replace(/<\/?.+?\/?>/g, str);
}


// search tags in string
// tagName: string, tag that want to search
// return status, bool, if has tag(name)
String.prototype.hasTag = function(tagName) {

	// specific tag
	if (tagName) return this.match(new RegExp(`<[\s\/]*?${ tagName }.*?>`, 'g')).length !== null;

	// all tag
	else return this.match(/<\/?.+?\/?>/g) !== null;
}


// extract information from xml tag, e.g. '<...>'
// return info: object, parsed tag information [tagname/attrname: value(string)]
String.prototype.parseTag = function() {
	var info = {};

	// parsing
	this.replace(/[<>]/g, '').trim('/\s').split(/\s+/g).forEach((str, i) => {
		if (i === 0) info['tagName'] = str;
		else {
			let entry = str.split('=');
			info[entry[0].trim()] = entry[1].trim('"');
		}
	});

	return info;
}


// see if there is element has specific name in array
// name: string, target name value
// return flag, bool, if exist
Array.prototype.hasName = function(name) {
	var flag = false;
	this.forEach(entry => {
		if (entry.name === name) flag = true;
	});
	return flag;
}


// get index of element has specific name in array
// name: string, target name value
// return index, int, index
Array.prototype.indexOfName = function(name) {
	for (let i = 0; i < this.length; i++) {
		if (this[i].name === name) return i;
	}
}


// ------------------------- data structure ---------------------------


// metadata spec
class MetadataSpec {
	constructor() {
		this.spec =  {
			"corpus": {
				zh: "��㭱���蝔�",
				post: true,
				hint: [
					"敺��憿痹���䲰憭𡁏��駁����衤��箏������",
					"隤芣�嚗𡁏��駁����蝔晞��",
					"隢钅��滢蝙�其��㛖㮾�𦦵泵�����,�溻��-�溻�𪊺�溻�𢞖�扼�溻��;�溻��"
				]
			}, 

			"filename":	{
				zh: "瑼𥪜�",
				post: false,
				hint: [
					"隤芣�嚗𡁶���㭱��葉瘥譍�蝑���嗵��臭��抒楊蝣潦��"
				]
			}, 

			"title": {
				zh: "��辣璅䠷�",
				post: false,
				hint: [
					"敺��憿鮋＊蝷綽�-",
					"隤芣�嚗朞府蝑��隞嗆�憿䎚��"
				]
			},

			"author": {
				zh: "��辣雿𡏭��",
				post: true,
				hint: [
					"敺��憿鮋＊蝷綽�AU",
					"隤芣�嚗朞府蝑��隞嗡�����"
				]
			},

			"book_code": {
				zh: "��辣�貊Ⅳ",
				post: true,
				hint: [
					"敺��憿鮋＊蝷綽�BC",
					"隤芣�嚗朞府蝑��隞嗥��貊Ⅳ蝺刻���"
				]
			},

			"compilation_name":{
				zh: "��辣�箄�",
				post: true,
				hint: [
					"敺��憿鮋＊蝷綽�COMP", 
					"隤芣�嚗朞府蝑��隞嗅枂�𨰻��"
				]
			},

			"compilation_order": {
				zh: "��辣�箄���活摨�",
				post: false,
				hint: [
					"敺��憿鮋＊蝷綽�-",
					"隤芣�嚗𡁏�隞嗅枂�閧��鍦�蝺刻���", 
					"憒�𧊋閮剖�嚗𣬚頂蝯勗��芸�蝯西���",
					"�怎�雿𦦵鍂��"
				]
			}, 

			"compilation_vol": {
				zh: "��辣�箄������",
				post: false,
				hint: [
					"敺��憿鮋＊蝷綽�-",
					"隤芣�嚗朞府蝑��隞嗅枂�𨰻����匧��𠺪��箸��典��詻��"
				]
			},

			"doc_attachment": {
				zh: "��辣�𡝗�",
				post: false,
				hint: [
					"敺��憿鮋＊蝷綽�-",
					"隤芣�嚗朞府��辣����硔��",
					"��迂憭𡁜�瑼䈑���隞亙�敶Ｕ��;�滚��𢛵��",
					"憛恍��𡝗�摰峕㟲�� URI��",
					"銋笔虾憛恍��𡝗��滨迂嚗���恍�瑼𥪜�嚗㚁�雿�府�𡝗���銝𠰴� DocuSky 銝餅��滩�憿舐內����桀� DocuSky �𡝗�銝𠰴��蠘��芷��橘�"
				]
			}, 

			"doc_attachment_caption": {
				zh: "�𤥁牧",
				post: false,
				hint: []
			},

			"doc_category_l1": {
				zh: "��辣����𤾸惜銝�",
				post: true,
				hint: [
					"敺��憿鮋＊蝷綽�CAT",
					"隤芣�嚗朞府蝑��隞嗥�蝚砌�撅文�憿𠺶��",
					"�典�������隞㚚�撅文�憿硺��屸＊蝷綽�����𤾸惜銝�/����𤾸惜鈭�/����𤾸惜銝�"
				]
			}, 

			"doc_category_l2": {
				zh: "��辣����𤾸惜鈭�",
				post: true,
				hint: [
					"敺��憿鮋＊蝷綽�CAT",
					"隤芣�嚗朞府蝑��隞嗥�蝚砌�撅文�憿𠺶��",
					"�典�������隞㚚�撅文�憿硺��屸＊蝷綽�����𤾸惜銝�/����𤾸惜鈭�/����𤾸惜銝�"
				]
			}, 

			"doc_category_l3": {
				zh: "��辣����𤾸惜銝�",
				post: true,
				hint: [
					"敺��憿鮋＊蝷綽�CAT",
					"隤芣�嚗朞府蝑��隞嗥�蝚砌�撅文�憿𠺶��",
					"�典�������隞㚚�撅文�憿硺��屸＊蝷綽�����𤾸惜銝�/����𤾸惜鈭�/����𤾸惜銝�"
				]
			}, 

			"doc_seq_number": {
				zh: "��辣���",
				post: false,
				hint: [
					"敺��憿鮋＊蝷綽�-",
					"隤芣�嚗朞府��辣璅嗵內����㯄�摨譌��",
					"憛恍��湔彍嚗峕迤鞎䭾彍��虾��"
				]
			}, 

			"doc_source": {
				zh: "��辣靘��",
				post: true,
				hint: [
					"敺��憿鮋＊蝷綽�SRC",
					"隤芣�嚗朞府��辣���皞琜��航��箸��𧢲��駁���"
				]
			}, 

			"doc_topic_l1": {
				zh: "��辣銝駁��𤾸惜銝�",
				post: true,
				hint: [
					"敺��憿鮋＊蝷綽�TP",
					"隤芣�嚗朞府蝑��隞嗥�蝚砌�撅支蜓憿䎚��",
					"�典�������隞㚚�撅支蜓憿䔶��屸＊蝷綽�銝駁��𤾸惜銝�/銝駁��𤾸惜鈭�/銝駁��𤾸惜銝�"
				]
			}, 

			"doc_topic_l2": {
				zh: "��辣銝駁��𤾸惜鈭�",
				post: true,
				hint: [
					"敺��憿鮋＊蝷綽�TP",
					"隤芣�嚗朞府蝑��隞嗥�蝚砌�撅支蜓憿䎚��",
					"�典�������隞㚚�撅支蜓憿䔶��屸＊蝷綽�銝駁��𤾸惜銝�/銝駁��𤾸惜鈭�/銝駁��𤾸惜銝�"
				]
			}, 

			"doc_topic_l3": {
				zh: "��辣銝駁��𤾸惜銝�",
				post: true,
				hint: [
					"敺��憿鮋＊蝷綽�TP",
					"隤芣�嚗朞府蝑��隞嗥�蝚砌�撅支蜓憿䎚��",
					"�典�������隞㚚�撅支蜓憿䔶��屸＊蝷綽�銝駁��𤾸惜銝�/銝駁��𤾸惜鈭�/銝駁��𤾸惜銝�"
				]
			}, 	

			"docclass": {
				zh: "��辣憿𧼮ê̌",
				post: true,
				hint: [
					"敺��憿鮋＊蝷綽�CLASS",
					"隤芣�嚗朞府蝑��隞嗆�撅祉����憿𧼮ê̌��"
				]
			}, 

			"docclass_aux": {
				zh: "��辣摮鞾���",
				post: false,
				hint: [
					"敺��憿鮋＊蝷綽�-",
					"隤芣�嚗朞府蝑��隞嗆�撅祉�摮鞾�����乓��"
				]
			}, 

			"doctype": {
				zh: "��辣�𧢲�",
				post: true,
				hint: [
					"敺��憿鮋＊蝷綽�TYPE",
					"隤芣�嚗朞府蝑��隞嗥��𧢲���"
				]
			}, 

			"doctype_aux": {
				zh: "��辣摮𣂼���",
				post: false,
				hint: [
					"敺��憿鮋＊蝷綽�-",
					"隤芣�嚗朞府蝑��隞嗥�摮𣂼��卝��"
				]
			},   
			
			"geo_level1": {
				zh: "��辣�啣��𤾸惜銝�",
				post: true,
				hint: [
					"敺��憿鮋＊蝷綽�GEO",
					"隤芣�嚗朞府蝑��隞嗥�蝚砌�撅文𧑐�麄��",
					"�典�������隞㚚�撅文𧑐�煺��屸＊蝷綽��啣��𤾸惜銝�/�啣��𤾸惜鈭�/�啣��𤾸惜銝�"
				]
			}, 

			"geo_level2": {
				zh: "��辣�啣��𤾸惜鈭�",
				post: true,
				hint: [
					"敺��憿鮋＊蝷綽�GEO",
					"隤芣�嚗朞府蝑��隞嗥�蝚砌�撅文𧑐�麄��",
					"�典�������隞㚚�撅文𧑐�煺��屸＊蝷綽��啣��𤾸惜銝�/�啣��𤾸惜鈭�/�啣��𤾸惜銝�"
				]
			}, 

			"geo_level3": {
				zh: "��辣�啣��𤾸惜銝�",
				post: true,
				hint: [
					"敺��憿鮋＊蝷綽�GEO",
					"隤芣�嚗朞府蝑��隞嗥�蝚砌�撅文𧑐�麄��",
					"�典�������隞㚚�撅文𧑐�煺��屸＊蝷綽��啣��𤾸惜銝�/�啣��𤾸惜鈭�/�啣��𤾸惜銝�"
				]
			}, 

			"geo_longitude": {
				zh: "��辣���函�摨�",
				post: true,
				hint: [
					"敺��憿鮋＊蝷綽�GEO_XY",
					"隤芣�嚗朞府蝑��隞嗆��函�摨艾��",
					"�典������楝摨虫��屸＊蝷綽�嚗��摨� X, 蝺臬漲 Y嚗�"
				]
			}, 

			"geo_latitude": {
				zh: "��辣���函楝摨�",
				post: true,
				hint: [
					"敺��憿鮋＊蝷綽�GEO_XY",
					"隤芣�嚗朞府蝑��隞嗆��函楝摨艾��",
					"�典������楝摨虫��屸＊蝷綽�嚗��摨� X, 蝺臬漲 Y嚗�"
				]
			}, 
					
			"time_orig_str": {
				zh: "��辣���(摮𦯀葡)",
				post: false,
				hint: [
					"敺��憿鮋＊蝷綽�-",
					"隤芣�嚗朞府蝑��隞嗅枂�曉銁��𧋦����栞�閮𠺪��箸�摮𦯀葡敶Ｗ���"
				]
			}, 

			"time_varchar": {
				zh: "��辣���(镼踵�)",
				post: false,
				hint: [
					"敺��憿鮋＊蝷綽�-",
					"隤芣�嚗朞府蝑��隞嗥����嚗䔶誑镼踹��交�憛恍���",
					"憛恍��澆�嚗䱭yyymmdd",
					"�芰䰻������鋆� 0嚗䔶�憒��19870500嚗𣬚� 1987 撟� 5 ����交��芰䰻��"
				]
			},  
					
			"time_norm_year": {
				zh: "��辣���(銝剜�)",
				post: true,
				hint: [
					"敺��憿鮋＊蝷綽�CHNY",
					"隤芣�嚗朞府蝑��隞嗥����嚗䔶誑銝剜��交�憛恍���",
					"憛恍��澆�嚗帋��祉���僑��00撟�00��00�乓�㵪�雿���琜�隞滚虾雿輻鍂�䔶�閰喋�齿��𨬭�屸��溻��"
				]
			},

			"era": {
				zh: "��辣���(撟渲�)",
				post: true,
				hint: [
					"敺��憿鮋＊蝷綽�ERA",
					"隤芣�嚗朞府蝑��隞嗥�銝剜������",
					"��‵��僑���靘见�嚗帋嗾����"
				]
			}, 

			"time_norm_kmark": {
				zh: "��辣���(撣肽�)",
				post: true,
				hint: [
					"敺��憿鮋＊蝷綽�EMP",
					"隤芣�嚗朞府蝑��隞嗥�銝剜������",
					"��‵������靘见�嚗𡁏�擃睃���"
				]
			}, 

			"year_for_grouping": {
				zh: "��辣���(镼踹�撟�)",
				post: true,
				hint: [
					"敺��憿鮋＊蝷綽�ADY",
					"隤芣�嚗朞府蝑��隞嗥�镼踹�撟湛���‵撟氬��",
					"镼踹��滨�撟港遢嚗䔶誑��-�齿�蝷綽�靘页�-272嚗諹”蝷箄正��� 272 撟氬��",
					"撟港遢�芰䰻�𡝗��匧僑隞踝�蝟餌絞撠�䌊�閧策鈭���9999�滨��潦��"
				]
			}, 

			"time_dynasty": {
				zh: "��辣���(�苷誨)",
				post: true,
				hint: [
					"敺��憿鮋＊蝷綽�DYN",
					"隤芣�嚗朞府蝑��隞嗥�銝剜��苷誨��",
					"�苷誨�芰䰻�𡝗��匧‵���蝟餌絞撠�䌊�閧策鈭���-�溻��"
				]
			}, 

			"timeseq_not_before": {
				zh: "��辣韏瑕����",
				post: true,
				hint: [
					"敺��憿鮋＊蝷綽�TNB",
					"敺��憿噼牧�𠬍�閮��閰脫𠯫�煺�敺𣬚����㗇�隞嗚��",
					"隤芣�嚗朞府��辣璅嗵內��絲憪𧢲��瓐��",
					"憛恍��澆�嚗䱭yyymmdd �� -yyyymmdd��𧊋�交�瘝埝���� 0��"
				]
			}, 

			"timeseq_not_after": {
				zh: "��辣蝯鞉����",
				post: true,
				hint: [
					"敺��憿鮋＊蝷綽�TNA",
					"敺��憿噼牧�𠬍�閮��閰脫𠯫�煺��滨����㗇�隞�",
					"隤芣�嚗朞府��辣璅嗵內�������瓐��",
					"憛恍��澆�嚗䱭yyymmdd �� -yyyymmdd��𧊋�交�瘝埝���� 0��"
				]
			}
		};

		this.sky2meta = {
			"corpus":					"corpus", 
			"docFilename":				"filename", 
			"docTitleXml":				"title", 
			"docAuthor":				"author", 
			"docBookCode":				"book_code", 
			"docCompilation":			"compilation_name", 
			"docAttachmentList":		"doc_attachment", 
			"docAttachmentCaptions":	"doc_attachment_captions",
			"docCategoryL1":			"doc_category_l1", 
			"docCategoryL2":			"doc_category_l2", 
			"docCategoryL3":			"doc_category_l3", 
			"docSource":				"doc_source", 
			"docTopicL1":				"doc_topic_l1", 
			"docTopicL2":				"doc_topic_l2", 
			"docTopicL3":				"doc_topic_l3", 
			"docClass":					"docclass", 
			"docSubclass":				"docclass_aux", 
			"docType":					"doctype", 
			"docSubtype":				"doctype_aux", 
			"geoLevel1":				"geo_level1", 
			"geoLevel2":				"geo_level2", 
			"geoLevel3":				"geo_level3", 
			"geoX":						"geo_longitude", 
			"geoY":						"geo_latitude", 
			"dateOrigStr":				"time_orig_str", 
			"dateAdDate":				"time_varchar", 
			"dateChNormYear":			"time_norm_year", 
			"dateEra":					"era", 
			"dateEmperorTitle":			"time_norm_kmark", 
			"dateAdYear":				"year_for_grouping",
			"dateDynasty":				"time_dynasty", 
			"timeseqNotBefore":			"timeseq_not_before", 
			"timeseqNotAfter":			"timeseq_not_after"
		};

		this.local2meta = {
			"compilation":				"compilation_name",
			"time_ad_date":				"time_varchar",
			"time_era":					"era",
			"time_ad_year":				"year_for_grouping"
		}
	}
}


// data structure of corpus metadata
class CorpusMetadata {

	constructor() {
		this.metadata = [];
		this.tag = [];
	}

	addMetaSetting(name, value, order) {
		if (this.metadata.hasName(name)) return;
		this.metadata.push({
			name: name,			// tag name: required
			value: value,		// displayed post-classification string: optional, default = tag zh name
			order: order 		// displayed order: optional, default = 999
		});
	}

	addTagSetting(name, title) {
		if (this.tag.hasName(name)) return;
		this.tag.push({
			name: name,			// tag name: required
			title: title		// displayed post-classification string: optional, default = tag name
		});
	}

	removeSetting(item, name) {
		var index = this[item].indexOfName(name);
		if (index < 0) return;
		this[item].splice(index, 1);
	}

	getSetting(type, name) {
		var index = this[item].indexOfName(name);
		if (index < 0) return 'no data of this name';
		else return this[item][index];
	}
}


// data structure of a document in DocuXML
class Document {

	constructor() {
		this.filename = '';
		this.corpus = '';
		this.metadata = [];
		this.udefmetadata = [];
		this.otherdata = [];
		this.metatags = [];
		this.comments = [];
		this.events = [];
		this.content = '';
	}

	reset(name) {
		if (['filename', 'corpus', 'content'].indexOf(name) >= 0) this[name] = '';
		else if (name) this[name] = [];
		else {
			for (let attr in this) reset(attr);
		}
	}

	setMetadata(name, zhname, value) {
		if (this.metadata.hasName(name)) return;
		this.metadata.push({
			name: name,
			zhname: zhname,
			value: value
		});
	}

	setUdefMetadata(name, value, link) {
		if (this.udefmetadata.hasName(name)) return;
		this.udefmetadata.push({
			name: name,
			value: value,
			link: link
		});
	}

	setOtherData(name, value) {
		this.otherdata.push({
			name: name,
			value: value
		});
	}

	setMetaTag(name, value, freq) {
		this.metatags.push({
			name: name,
			value: value,
			freq: freq
		});
	}

	addCommentEntry() {
		this.comments.push([]);
		return this.comments.length - 1;
	}

	setCommentItem(index, value, category) {
		this.comments[index].push({
			Category: category,
			value: value
		});
	}

	addEventsEntry() {
		this.events.push([]);
		return this.events.length - 1;
	}

	setEvent(index, value, title) {
		this.events[index].push({
			Title: title,
			value: value
		});
	}

	setDocContent(content) {
		this.content = content;
	}

	removeByName(item, name) {						// do not included content, comment, event
		var index = this[item].indexOfName(name);
		if (index < 0) return;
		this[item].splice(index, 1);
	}

	getByName(item, name) {							// do not included content, comment, event
		var index = this[item].indexOfName(name);
		if (index < 0) return;
		this[item].splice(index, 1);
	}
}


// ------------------------- parser ---------------------------


// parse DocuXML data
class DocuxmlParser {

	// meta: MetadataSpec, convert metadata name to spec form
	constructor() {
		this.meta = new MetadataSpec();
	}

	// * * * * * * * * * * * * * * * * docusky * * * * * * * * * * * * * * * * *

	// process data from docusky database through api
	// docList: array(object), documents data from docusky
	// return data: array(Document), parsed result
	processDocuSkyRowData(docList) {
		var data = [];

		// each document
		docList.forEach(doc => {
			data.push(this.parseDocInfo(doc.docInfo));
		});

		return data;
	}

	// parse data in docInfo object
	// data: object, information of document [item: value(multiple classes)]
	// return docObj: Document, parsed result
	parseDocInfo(data) {
		var docObj = new Document();

		// each info
		for (let item in data) {
			let itemName = (item in this.meta.sky2meta) ?this.meta.sky2meta[item] :item;

			// system defined metadata
			if (itemName in this.meta.spec) docObj.setMetadata(itemName, this.meta.spec[itemName].zh, data[item].replaceTag());

			// metadata of geography and time
			else if (itemName === 'placeInfo' || itemName === 'timeInfo') this.parseObjectMetadata(docObj, data[item]);

			// user defined metadata
			else if (itemName === 'docMetadataXml') this.parseUdefMetadata(docObj, data[item].replaceTag('DocMetadata'));

			// document content
			else if (itemName === 'docContentXml') this.parseDocContent(docObj, data[item]);
			
			// undefined data in docuxml (maybe system used data)
			else docObj.setOtherData(itemName, data[item]);

			// filename and corpus
			if (itemName === 'filename') docObj.filename = data[item].replaceTag();
			if (itemName === 'corpus') docObj.corpus = data[item].replaceTag();
		}

		return docObj;
	}

	// parse metadata in object form
	// docObj: Document, parsed data container
	// data: object, metadata [name: value(string)]
	parseObjectMetadata(docObj, data) {

		// each metadata
		for (let item in data) {
			let itemName = (item in this.meta.sky2meta) ?this.meta.sky2meta[item] :item;

			// system defined metadata
			if (itemName in this.meta.spec) docObj.setMetadata(itemName, this.meta.spec[itemName].zh, data[item]);

			// undefined data in docuxml (maybe system used data)
			else docObj.setOtherData(itemName, data[item]);
		}
	}	

	// * * * * * * * * * * * * * * * * local * * * * * * * * * * * * * * * * *

	// process data from xml file of user uploaded
	// xml: string, docuxml
	// return data: object, parsed result [corpusname: corpus data (array(Document))]
	processXMLRowData(xml) {
		var me = this;
		var data = {};
		var xmlDoc = new DOMParser().parseFromString(xml, 'text/xml');

		// each document
		$(xmlDoc).find('document').each(function() {
			let docObj = me.parseDocument(this);
			if (data[docObj.corpus] === undefined) data[docObj.corpus] = [];
			data[docObj.corpus].push(docObj);
		});

		return data;
	}

	// parse xml in <document>
	// doc: DOM, docuxml of a document
	// return docObj: Document, parsed result
	parseDocument(doc) {
		var me = this;
		var docObj = new Document();

		// filename and corpus
		docObj.filename = $(doc).attr('filename').trim();
		docObj.corpus = $(doc).find('corpus').text().trim();

		// each info
		$(doc).children().each(function() {
			let itemName = (this.tagName in me.meta.local2meta) ?me.meta.local2meta[this.tagName] :this.tagName;
			
			// system defined metadata
			if (itemName in me.meta.meta2zh) docObj.setMetadata(itemName, me.meta.meta2zh[itemName], this.textContent.trim());

			// user defined metadata
			else if (itemName === 'xml_metadata') me.parseUdefMetadata(docObj, this.innerHTML);

			// document content
			else if (itemName === 'doc_content') me.parseDocContent(docObj, this.outerHTML);

			// undefined data in docuxml (maybe system used data)
			else docObj.setOtherData(itemName, this.innerHTML.trim());
		});

		return docObj;
	}

	// * * * * * * * * * * * * * * * * common * * * * * * * * * * * * * * * * *

	// parse user defined metadata
	// docObj: Document, parsed data container
	// data: string, metadata xml
	parseUdefMetadata(docObj, data) {
		var xmlDoc = new DOMParser().parseFromString(data, 'text/xml');

		// each user defined metadata
		$(xmlDoc).children().each(function() {
			let tagName = ((this.tagName.indexOf('Udef_') < 0) ?'Udef_' :'') + this.tagName;
			let value = this.textContent.trim();
			let link = (this.innerHTML.indexOf('href') < 0) ?'' :$(this).find('a').attr('href');
			docObj.setUdefMetadata(tagName, value, link);
		});
	}

	// parse doc_content xml
	// docObj: Document, parsed data container
	// data: string, content xml
	parseDocContent(docObj, data) {
		var xmlDoc = new DOMParser().parseFromString(data, 'text/xml');

		// metatags
		$(xmlDoc).find('MetaTags').each(function() {
			$(this).children().each(function() {
				docObj.setMetaTag(this.tagName, this.textContent.trim());
			});
		});

		// comments
		$(xmlDoc).find('Comment').each(function() {
			let index = docObj.addCommentEntry();
			$(this).children().each(function() {
				docObj.setCommentItem(index, this.innerHTML.trim(), $(this).attr('Category'));
			});
		});

		// comments
		$(xmlDoc).find('Events').each(function() {
			let index = docObj.addEventsEntry();
			$(this).children().each(function() {
				docObj.setEvent(index, this.innerHTML.trim(), $(this).attr('Title'));
			});
		});

		// document content
		$(xmlDoc).find('MetaTags').remove();
		$(xmlDoc).find('Comment').remove();
		$(xmlDoc).find('Events').remove();
		docObj.setDocContent(new XMLSerializer().serializeToString(xmlDoc).trim());
	}
}


// ------------------------- former ---------------------------


// form DocuXML
export default class DocuxmlFormer {

	// meta: MetadataSpec, convert metadata name to spec form
	// udefTemp: array(object), temp of metadata not in spec => udef
	// corpusMetaTemp: object, record corpus metadata when forming, or given by user, [corpus name: CorpusMetadata]
	// collect: bool, if pick corpus metadata
	constructor() {
		this.meta = new MetadataSpec();
		this.udefTemp = [];
		this.corpusMetaTemp = {};
		this.collect = false;
	}

	// form docuxml from specific data form
	// data: array(Document/object), documents data
	// corpusMeta: object, corpus metadata (optional), [corpus name: CorpusMetadata]
	// return xml: string, docuxml
	form(data, corpusMeta) {
		var corpus = '', docs = '';
		this.collect = (corpusMeta) ?false :true;

		// initial corpus metadata
		if (collect) this.corpusMetaTemp = {};
		else this.corpusMetaTemp = corpusMeta;

		// each document
		data.forEach((docObj, i) => {
			docs += this.formDoc(docObj, i);
		});

		// each corpus
		for (let name in this.corpusMetaTemp) {
			corpus += this.formCorpusMeta(name, this.corpusMetaTemp[name]);
		}

		return '<?xml version="1.0"?>\n' + 
				this.generateXML({
					name: 'ThdlPrototypeExport',
					br: true,

					value: corpus + this.generateXML({
							name: 'documents',
							br: true,
							value: docs
						})
				});
	}

	// form docuxml of a document
	// docObj: Document, data of a document
	// return xml: string, docuxml
	formDoc(docObj) {
		return this.generateXML({
			name: 'document',
			attr: {
				filename: docObj.filename
			},
			br: true,

			value: this.generateXML({
					name: 'corpus',
					br: false,
					value: docObj.corpus
				}) + this.generateMetadata(docObj)
				+ this.generateUdefMetadata(docObj.udefmetadata)
				+ this.generateDocContent(docObj)
		});
	}

	// form docuxml of a corpus metadata
	// name: string, corpus name
	// corpusObj: CorpusMetadata, corpus metadata information
	// return xml: string, docuxml
	formCorpusMeta(name, corpusObj) {
		var meta = '', tag = '';

		// metadata
		corpusObj.metadata.forEach(setting => {
			if (this.meta.spec[setting.name].post) {		// filter					
				meta += this.generateXML({
					name: setting.name,
					attr: {
						show_spotlight: 'Y',
						display_order: (setting.order) ?setting.order :999
					},
					br: false,
					value: (setting.value) ?setting.value :this.meta.spec[setting.name].zh
				});
			}
		});

		// tag
		corpusObj.tag.forEach((setting, index) => {
			tag += this.generateXML({
				single: true,
				name: 'spotlight',
				attr: {
					category: setting.name,
					sub_category: '-',
					display_order: index,
					title: (setting.title) ?setting.title :setting.name
				}
			}) + this.generateXML({
				single: true,
				name: 'tag',
				attr: {
					type: 'contentTagging',
					name: setting.name,
					default_category: setting.name,
					default_sub_category: '-'
				}
			});
		});

		return this.generateXML({
			name: 'corpus',
			attr: { name: name },
			br: true,
			value: this.generateXML({
					name: 'metadata_field_settings',
					br: true,
					value: meta
				}) + this.generateXML({
					name: 'feature_analysis',
					br: true,
					value: tag
				})
		});
	}

	// generate basic xml string - <...></...>
	// tag: object, information of tag, [name, attr, value: string, br, single: bool]
	generateXML(tag) {
		var attr = '';
		for (let name in tag.attr) attr += ` ${ name }="${ tag.attr[name] }"`;
		if (tag.single) return `<${ tag.name }${ attr }/>\n`;
		else return `<${ tag.name }${ attr }>${ (tag.br) ?'\n' :'' }${ tag.value }</${ tag.name }>\n`;
	}

	// generate metadata xml string
	// docObj: Document, data of a document
	// return str: string, docuxml
	generateMetadata(docObj) {
		var str = '';

		docObj.metadata.forEach(metadata => {
			if (metadata.name === 'corpus') {
				// skip

			} else if (metadata.name in this.meta.spec) {

				// metadata
				str += this.generateXML({
					name: metadata.name,
					br: false,
					value: metadata.value
				});

				// corpus metadata
				if (this.collect) {
					if (! docObj.corpus in this.corpusMetaTemp) this.corpusMetaTemp[docObj.corpus] = new CorpusMetadata();
					this.corpusMetaTemp[docObj.corpus].addMetaSetting(metadata.name);
				}

			} else this.udefTemp.push(metadata);
		});

		return str;
	}

	// generate user defined metadata xml string
	// list: array(object), Document.udefmetadata
	// return xml: string, docuxml
	generateUdefMetadata(list) {
		var str = '';

		// udef metadata
		list.forEach(metadata => {
			let value = (metadata.link) ? this.generateXML({
											name: 'a',
											attr: {
												href: metadata.link,
												target: '_blank'
											},
											br: false,
											value: metadata.value
										}) :metadata.value;
			str += this.generateXML({
				name: metadata.name,
				br: false,
				value: value
			});
		});

		// filter from metadata
		this.udefTemp.forEach(metadata => {
			str += this.generateXML({
				name: (metadata.name.indexOf('Udef_') < 0) ?'Udef_' + metadata.name :metadata.name,
				br: false,
				value: metadata.value
			});
		});

		this.udefTemp = [];
		return this.generateXML({
			name: 'xml_metadata',
			br: true,
			value: str
		});
	}

	// generate doc_content xml string
	// docObj: Document, data of a document
	// return xml: string, docuxml
	generateDocContent(docObj) {
		var metatags = '';
		var comments = '';
		var events = '';

		// metatags
		docObj.metatags.forEach(tag => {
			let obj = {
				name: tag.name,
				br: false,
				value: tag.value
			};

			if (tag.freq) obj.attr = { Frequency: tag.freq };
			metatags += this.generateXML(obj);

			// corpus metadata
			if (this.collect) {
				if (! docObj.corpus in this.corpusMetaTemp) this.corpusMetaTemp[docObj.corpus] = new CorpusMetadata();
				this.corpusMetaTemp[docObj.corpus].addTagSetting(tag.name);
			}
		});

		if (metatags !== '') metatags = this.generateXML({
			name: 'MetaTags',
			attr: { NoIndex: 1 },
			br: true,
			value: metatags
		});

		// comments
		docObj.comments.forEach(comment => {
			let items = '';
			
			comment.forEach(item => {
				let info = {
					name: 'CommentItem',
					br: false,
					value: item.value
				};

				if (item.Category) info.attr = { Category: item.Category };
				items += this.generateXML(info);
			});

			comments += this.generateXML({
				name: 'Comment',
				attr: { NoIndex: 1 },
				br: true,
				value: items
			});
		});

		// events
		docObj.events.forEach(event => {
			let items = '';

			event.forEach(item => {
				let info = {
					name: 'Event',
					br: false,
					value: item.value
				};

				if (item.Title) info.attr = { Title: item.Title };
				items += this.generateXML(info);
			});

			events += this.generateXML({
				name: 'Events',
				attr: { NoIndex: 1, NoTagAnalysis: 1 },
				br: true,
				value: items
			});
		});

		return this.generateXML({
			name: 'doc_content',
			br: true,
			value: docObj.content + metatags + comments + events
		});
	}
}
