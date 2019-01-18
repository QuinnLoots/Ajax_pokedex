$( document ).ready(function() {
    let pokeinfo =[];
    let prev;
    function getpokemon(content){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', "https://pokeapi.co/api/v2/pokemon/"+content+"/", true);

        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200){
                
                //alert("done");
                let pokemon = JSON.parse(xhr.responseText);
                pokeinfo=[pokemon.name,pokemon.id,pokemon.sprites.front_default,pokemon.species.url,pokemon.moves];
                showpokemon();
                getprev();
                 
                

            }else if(xhr.status == 404){
                alert("Page not found");   
            }
    
            
        };
        xhr.send();   
    }

    function showpokemon(){
        $("#pokemonimage").attr("src",pokeinfo[2]);
        $("#pokemonname").text(pokeinfo[0]);
        $("#pokemonid").text(pokeinfo[1]);
        $("#moves").html("<ul>");
        let aantalmoves;
        if(pokeinfo[4].length<4){
            aantalmoves=pokeinfo[4].length;
        }else{
            aantalmoves=4;
        }
        for (let i = 0; i < aantalmoves; i++) {
            
            $("#moves").html($("#moves").html() + "<li>"+pokeinfo[4][i].move.name+"</li>");
        }
        $("#moves").html($("#moves").html() +"</ul>");
    }

    function getprev(){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', pokeinfo[3], true);

        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200){
                
                //alert("done");
                let pokemon = JSON.parse(xhr.responseText);
                if(pokemon.evolves_from_species != null){
                    pokeinfo.push(pokemon.evolves_from_species.name);
                    showprev(pokeinfo[5]);
                }else{
                    $("#previous").attr("src",""); 
                    $("#prevname").text("Previous: none");
                }
                
               

                

            }else if(xhr.status == 404){
                alert("Page not found");   
            }
    
            
        };
        xhr.send();    
    }
    

    $( "#button1" ).click(function() {
        let searchvalue = $("#searchcontent").val();
        getpokemon(searchvalue);
        
       // getprev();
      });

      function showprev(content){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', "https://pokeapi.co/api/v2/pokemon/"+content+"/", true);

        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200){
                
                //alert("done");
                let pokemon = JSON.parse(xhr.responseText);
                pokeinfo.push(pokemon.sprites.front_default);
                $("#previous").attr("src",pokeinfo[6]); 
                $("#prevname").text("Previous: "+pokeinfo[5]);
                

            }else if(xhr.status == 404){
                alert("Page not found");   
            }
    
            
        };
        xhr.send();   
    }
});