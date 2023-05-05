function vermelho(alfinete, nome, descricao){
	$(alfinete) 
	  .mouseover(function() {
	    $(alfinete).find("p.nome").text( nome );
	    $(alfinete).find("p.nome").css("display", "block");

	    var x = event.clientX;
			if(x > 370){
				$(alfinete).find("p.nome").css({ left: -210 });
				$(alfinete).find("p.desc").css({ left: -210 });
			}
	  })

	  .click(function() {
	    $(alfinete).find("p.desc").text( descricao );		    
	    $(alfinete).find("p.desc").css("display", "block");
	    var total = $(alfinete).find("p.desc").height()+$(alfinete).position().top;
	    if(total > 600){ 
	    	total = 600 - $(alfinete).position().top - $(alfinete).find("p.desc").height();
	    	$(alfinete).find("p.nome").css({ top: total });
	    	$(alfinete).find("p.desc").css({ top: total+10 });
	    }
	  })
	  
	  .mouseout(function() {
	    $(alfinete).find("p.nome").text( "" );
	    $(alfinete).find("p.nome").css("display", "none");
	    $(alfinete).find("p.desc").text( "" );
	    $(alfinete).find("p.desc").css("display", "none");
    	$(alfinete).find("p.nome").css({ top: -10 });
	  });
}

function azul(alfinete, nome){
	$(alfinete) 
	  .mouseover(function() {
	    $(alfinete).find("p.nome").text( nome );
	    $(alfinete).find("p.nome").css("display", "block");

	    var x = event.clientX;
			if(x > 370){
				$(alfinete).find("p.nome").css({ left: -210 });
			}
	  })

	  .mouseout(function() {
	    $(alfinete).find("p.nome").text( "" );
	    $(alfinete).find("p.nome").css("display", "none");
    	$(alfinete).find("p.nome").css({ top: -10 });
	  });
}

function slideRight(){
	i++;

	if(i >= images.length){
		i=0;
	}

	let target = "item_"+i;
	goToImage(target);
}

function slideLeft(){
	i--;

	if(i < 0){
		i=images.length-1;
	}

	let target = "item_"+i;
	goToImage(target);
}

function goToImage(j){ 
	i = j.replace('item_',''); 

	let fileName = images[i];
	let title = titles[i];
	let target = '<object id="loadedFile" data="'+fileName+'"/>';
    $("#loadExternalFile").html(target);
    $( "#loadedFile" ).css( "width", "800px" );
    $( "#loadedFile" ).css( "height", "500px" );
    $("#imgTitle").text(title);

    $(".selected" ).removeClass("selected");
	let element = "item_"+i;
	$("#item_"+i).addClass("selected");
}