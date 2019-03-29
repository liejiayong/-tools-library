function readyPrintState() {
       var desc = document.querySelector('#tab-description');
       var image = document.querySelector('img.attachment-shop_single.size-shop_single.wp-post-image');
       var imageSrc =image .getAttribute('src');
       var productTitle = document.querySelector('h1.product_title.entry-title');
       var productImage = "<img src='" + imageSrc + "' style='max-width:100%'/>"
       var printString = "<div class='container'><div class='row'><div class='col-sm-4'>";
       printString += productImage + "</div><div class='col-sm-8'>";
       printString += productTitle.outerHTML + "</div></div>";
       printString += desc.outerHTML;
       printString += "</div>";

       var printBtn = document.createElement('a');
       printBtn.style.cssText = 'color: rgb(35, 105, 182);cursor: pointer;margin-left: 1rem;font-size: 14px;text-decoration: underline;';
       printBtn.innerText = "PRINT DESCRIPTION";
       var fa = document.createElement("i");
       fa.className = 'fa fa-x fa-print';
       fa.setAttribute('aria-hidden','true');
       printBtn.insertBefore(fa,printBtn.childNodes[0]);
       console.log(desc.childNodes[0])
       desc.childNodes[1].appendChild(printBtn);

       printPage(printBtn,printString);

       /**
        * pringt sention part
        * @param btn 点击打印按钮
        * @param printStringContent 打印字符串内容
        * @constructor
        */
       function printPage(btn, printStringContent) {
           var ifr = document.createElement('iframe');
           ifr.style.cssText = "width:0;height:0;border:0;src=''";
           document.body.appendChild(ifr);
           btn.addEventListener('click', function () {
               ifr.contentDocument.body.innerHTML = printStringContent;
               ifr.contentDocument.close();
               ifr.contentWindow.print();
               console.log("printed you product");
           });
       }
   }
