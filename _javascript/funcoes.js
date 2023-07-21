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
