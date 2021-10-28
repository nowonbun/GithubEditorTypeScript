(function (obj) {
	$(obj.onLoad);
})((function () {
	interface cbData {
		message: string
	}
	let __ = {
		property: {
			maximumImageFileSize: 1024 * 1024,
			modifyMode: false,
			idx: $("#idx").val()
		},
		fn: {

		},
		ev: function () {
			$("#modify_btn").on("click", function () {
				let form = document.createElement('form');
				let submit = document.createElement('input');
				form.action = "./modify.html?idx=" + __.property.idx;
				form.method = "POST";
				submit.type = "submit";
				form.appendChild(submit);
				document.body.appendChild(form);
				submit.click();
			});

			$("pre code.hljs").each(function () {
				$(this).before($("<a href='javascript:void(0);' class='code-copy'><i class='fa fa-copy'></i>Copy!</a>"));
				$(this).before($("<div class='code-title'></div>").append($("<i class='fa fa-minus-square code-collapse'></i>"))
					.append("&nbsp;[Source view]&nbsp;" + $(this).data("type")));
				$(this).parent().addClass("code-view");
			});
			$(document).on("click", ".code-title", function () {
				let $this = $(this);
				let $i = $this.find("i.code-collapse");
				if ($i.hasClass("fa-plus-square")) {
					$i.removeClass("fa-plus-square");
					$i.addClass("fa-minus-square");
					$this.parent().removeClass("code-view-disabled");
				} else {
					$i.removeClass("fa-minus-square");
					$i.addClass("fa-plus-square");
					$this.parent().addClass("code-view-disabled");
				}
			});
			$(document).on("click", '.code-copy', function () {
				let $parent = $(this).closest(".code-view");
				if ($parent.hasClass("code-view-disabled")) {
					let $i = $parent.find("i.code-collapse");
					$i.removeClass("fa-plus-square");
					$i.addClass("fa-minus-square");
					$parent.removeClass("code-view-disabled");
				}
				toastr.success("", "コピーされました。", { timeOut: 700 });
				let code_element = $(this).closest("pre").find("code")[0];
				let value = code_element.innerText.replace(/\n\n\n/ig, '').replace('    \n', '');
				let selection = window.getSelection();
				let body_element = document.getElementsByTagName('body')[0];
				let newdiv = document.createElement('div');
				newdiv.style.position = 'absolute';
				newdiv.style.left = '-10000px';
				newdiv.style.top = '-10000px';
				body_element.appendChild(newdiv);
				newdiv.innerHTML = "<pre>" + escapeHTML(value) + "</pre>";
				selection?.selectAllChildren(newdiv);
				setTimeout(function () {
					newdiv.remove();
				}, 10000);
				document.execCommand('copy');
			});
		}
	};

	$(__.ev);
	return {
		onLoad: function () {

		}
	}
})());