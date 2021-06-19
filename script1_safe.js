function xmlToJson(xml) {
	var obj = {};
	if (xml.nodeType == 1) {
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) {
		obj = xml.nodeValue;
	}
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
}
let wasted = false
let blocked = false
let unliked = []
// operator
let operate = setInterval(function() {
  if (blocked) {
    console.log(`End. Total unliked: [${unliked.length}]`)
    console.log(unliked)
    clearInterval(operate);
    return;
  }
  if (wasted) {
    wasted = false
    const currentY = window.pageYOffset
    window.scrollTo(0, currentY + 10000)
    return;
  }
  const likes = document.body.querySelectorAll(
    'a.like_btn.like._like.active'
  );
  if (!likes.length) {
    console.log(`scroll* * * * * * * * * * * * * * * * * * * * * * * * * * *`)
    wasted = true
    return;
  }
  const item = xmlToJson(likes[0])
  if (unliked.length) {
    const lastValue = unliked[unliked.length - 1]?.['@attributes']?.onclick
    const curValue = item?.['@attributes']?.onclick
    if (lastValue && curValue) {
      if (lastValue === curValue) {
        console.log(`unliking was blocked!`)
        console.log(`previous unliked: ${lastValue}`)
        console.log(`current: ${curValue}`)
        blocked = true
        return;
      }
    }
  }
  likes[0].click();
  unliked.push(item)
  console.log(`unliked: [${unliked.length}]`)
}, 600);
