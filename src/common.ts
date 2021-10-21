function escapeHTML(unsafe: string) {
	return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
};
let loading = {
	on: () => {
		$(".loader").removeClass("off");
		$(".loader-layout").removeClass("off");
	},
	off: () => {
		$(".loader").addClass("off");
		$(".loader-layout").addClass("off");
	}
};

(function (obj) {
	$(obj.onLoad);
})((function () {
	$(".menu-toggle").on("click", function () {
		let $this = $(this);
		$("aside.leftside").toggleClass("on");
		$("section.menu-back-layout").toggleClass("off");
		$("body").toggleClass("mobile-fixed");
	});
	$(".menu-close").on("click", function () {
		$("aside.leftside").removeClass("on");
		$("section.menu-back-layout").addClass("off");
		$("body").removeClass("mobile-fixed");
	});
	$(document).on("click", ".link-item-collapse", function () {
		let $icon = $(this).find("span.fa");
		if ($icon.hasClass("fa-chevron-down")) {
			$icon.removeClass("fa-chevron-down");
			$icon.addClass("fa-chevron-up");
			$icon.closest("li").find(".sub_category_list").removeClass("off");
		} else if ($icon.hasClass("fa-chevron-up")) {
			$icon.removeClass("fa-chevron-up");
			$icon.addClass("fa-chevron-down");
			$icon.closest("li").find(".sub_category_list").addClass("off");
		}
	});
	$(document).on("change", ".search-text", function () {
		let $val = <string>$(this).val();
		if ($val !== undefined) {
			$(".search-text").val($val);
		}
	});
	$(document).on("click", ".search-btn", function () {
		let searchtext = <string>$(".search-text").val();
		if (searchtext !== undefined) {
			location.href = "./search.html?query=" + encodeURIComponent(searchtext);
		}

	});
	$(document).on("click", ".search-btn2", function () {
		let searchtest = <string>$(".search-text").val();
		if (searchtest !== undefined) {
			location.href = "./search.html?query=" + encodeURIComponent(searchtest);
		}

	});
	return {
		onLoad: function () {
			//let modal = document.getElementById('myModal');
			$("img").on("click", function () {
				$("#ImgModal").show();
				$("#ImgModal .modal-content").attr("src", (<HTMLImageElement>this).src);
			});
			$("#ImgModal").on("click", function () {
				$("#ImgModal").hide();
			});
			$("#ImgModal .close").on("click", function () {
				$("#ImgModal").hide();
			});
			document.addEventListener('copy', (e: ClipboardEvent) => {
				let url = document.location.href,
					decodedUrl = decodeURI(url),
					selection = window.getSelection();
				if (typeof window.getSelection === "undefined") {
					e.preventDefault();
					e.clipboardData?.setData('Text', selection + '\n\n Reference: [明月の開発ストーリ]' + decodedUrl);
					return;
				}
				if (selection !== null) {
					let body_element = document.getElementsByTagName('body')[0];
					let newdiv = document.createElement('div');
					newdiv.style.position = 'absolute';
					newdiv.style.left = '-99999px';
					body_element.appendChild(newdiv);
					newdiv.appendChild(selection.getRangeAt(0).cloneContents());
					newdiv.innerHTML = "<pre>" + escapeHTML(newdiv.outerText).replace(/\n\n/ig, '\n') + "</pre>";
					newdiv.innerHTML += '<br /><br />Reference: <a href="' + url + '">' + decodedUrl + '</a> [明月の開発ストーリ]';
					selection.selectAllChildren(newdiv);
					window.setTimeout(function () {
						body_element.removeChild(newdiv);
					}, 1);
				}
			});
		}
	}
})());