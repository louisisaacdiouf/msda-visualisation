  
// Get the Sidebar
var mySidebar = document.getElementById("mySidebar");

// Get the DIV with overlay effect
var overlayBg = document.getElementById("myOverlay");

// Toggle between showing and hiding the sidebar, and add overlay effect
function w3_open() {
  if (mySidebar.style.display === 'block') {
    mySidebar.style.display = 'none';
    overlayBg.style.display = "none";
  } else {
    mySidebar.style.display = 'block';
    overlayBg.style.display = "block";
  }
}

// Close the sidebar with the close button
function w3_close() {
  mySidebar.style.display = "none";
  overlayBg.style.display = "none";
}


    var annee = 2005;
    visualisation(annee);
    
    var width = 330,
        height = 330;

    // Config for the Radar chart
    var config = {
        w: width,
        h: height,
        maxValue: 100,
        levels: 5,
        ExtraWidthX: 270
    }

    //Call function to draw the Radar chart
    function visualisation(annee){
      Promise.all([
          d3.csv("donnees/donnees_benin.csv"),
          d3.csv("donnees/donnees_burkina.csv"),
          d3.csv("donnees/donnees_cabo_verde.csv"),
          d3.csv("donnees/donnees_cote_divoire.csv"),
          d3.csv("donnees/donnees_gambie.csv"),
          d3.csv("donnees/donnees_ghana.csv"),
          d3.csv("donnees/donnees_guinee.csv"),
          d3.csv("donnees/donnees_guinee_bissau.csv"),
          d3.csv("donnees/donnees_liberia.csv"),
          d3.csv("donnees/donnees_mali.csv"),
          d3.csv("donnees/donnees_niger.csv"),
          d3.csv("donnees/donnees_nigeria.csv"),
          d3.csv("donnees/donnees_senegal.csv"),
          d3.csv("donnees/donnees_sierra_leone.csv"),
          d3.csv("donnees/donnees_togo.csv"),
        ])
        .then(files =>{
          var donnees_benin           = files[0];
          var donnees_burkina         = files[1];
          var donnees_cabo_verde      = files[2];
          var donnees_cote_divoire    = files[3];
          var donnees_gambie          = files[4];
          var donnees_ghana           = files[5];
          var donnees_guinee          = files[6];
          var donnees_guinee_bissau   = files[7];
          var donnees_liberia         = files[8];
          var donnees_mali            = files[9];
          var donnees_niger           = files[10];
          var donnees_nigeria         = files[11];
          var donnees_senegal         = files[12];
          var donnees_sierra_leone    = files[13];
          var donnees_togo            = files[14];

          var pays = ["Bénin","Burkina Faso","Cap-Vert","Côte d'Ivoire","Gambie","Ghana","Guinée","Guinée Bissau","Libéria","Mali","Niger","Nigéria","Sénégal","Sierra Léone","Togo"];

          modalites = ["PIB", "taux_PIB", "PIB_par_habitant", "pourcentage_va_agriculture", "pourcentage_va_industrie", "services_et_autres", "taux_emploi_agriculture", "taux_emploi_industrie", "taux_emploi_services", "taux_chomage", "population_active_femmes", "population_active_hommes", "IPC", "indice_production_agricole", "indice_production_industrielle", "commerce_international_export", "commerce_international_import", "commerce_international_balance", "balance_paiements"];

          var colonnes = donnees_senegal.columns;

            ////////////////////////////////////////////////////////
           // MAXIMUMS ////////////////////////////////////////////
          ////////////////////////////////////////////////////////
          function list_max(a,tableau) {
            var max1 = Math.max.apply(Math, (tableau.filter(el => (el.Indicateur === a))).map(function(o) { return o.valeur_2005; }));
            var max2 = Math.max.apply(Math, (tableau.filter(el => (el.Indicateur === a))).map(function(o) { return o.valeur_2010; }));
            var max3 = Math.max.apply(Math, (tableau.filter(el => (el.Indicateur === a))).map(function(o) { return o.valeur_2019; }));

            return Math.max(max1,max2,max3);
          }

          var part_1 = [...donnees_benin,...donnees_burkina,...donnees_cabo_verde];
          var part_2 = [...donnees_cote_divoire,...donnees_gambie,...donnees_ghana];
          var part_3 = [...donnees_guinee,...donnees_guinee_bissau,...donnees_liberia];
          var part_4 = [...donnees_mali,...donnees_niger,...donnees_nigeria];
          var part_5 = [...donnees_senegal,...donnees_sierra_leone,...donnees_togo];

          function all_parts_max(modalite,partie1,partie2,partie3,partie4,partie5){
            var lm1 = list_max(modalite,partie1);
            var lm2 = list_max(modalite,partie2);
            var lm3 = list_max(modalite,partie3);
            var lm4 = list_max(modalite,partie4);
            var lm5 = list_max(modalite,partie5);

            return Math.max(lm1,lm2,lm3,lm4,lm5);
          }

          
          var max_PIB = all_parts_max("PIB",part_1,part_2,part_3,part_4,part_5);
          
          var max_taux_PIB = all_parts_max("taux_PIB",part_1,part_2,part_3,part_4,part_5);
          
          var max_PIB_par_habitant = all_parts_max("PIB_par_habitant",part_1,part_2,part_3,part_4,part_5);
          
          var max_pourcentage_va_agriculture = all_parts_max("pourcentage_va_agriculture",part_1,part_2,part_3,part_4,part_5);
          
          var max_pourcentage_va_industrie = all_parts_max("pourcentage_va_industrie",part_1,part_2,part_3,part_4,part_5);
          
          var max_services_et_autres = all_parts_max("services_et_autres",part_1,part_2,part_3,part_4,part_5);
          
          var max_taux_emploi_agriculture = all_parts_max("taux_emploi_agriculture",part_1,part_2,part_3,part_4,part_5);
          
          var max_taux_emploi_industrie = all_parts_max("taux_emploi_industrie",part_1,part_2,part_3,part_4,part_5);
          
          var max_taux_emploi_services = all_parts_max("taux_emploi_services",part_1,part_2,part_3,part_4,part_5);
          
          var max_taux_chomage = all_parts_max("taux_chomage",part_1,part_2,part_3,part_4,part_5);
          
          var max_population_active_femmes = all_parts_max("population_active_femmes",part_1,part_2,part_3,part_4,part_5);
          
          var max_population_active_hommes = all_parts_max("population_active_hommes",part_1,part_2,part_3,part_4,part_5);
          
          var max_IPC = all_parts_max("IPC",part_1,part_2,part_3,part_4,part_5);
          
          var max_indice_production_agricole = all_parts_max("indice_production_agricole",part_1,part_2,part_3,part_4,part_5);

          var max_indice_production_industrielle = all_parts_max("indice_production_industrielle",part_1,part_2,part_3,part_4,part_5);
          
          var max_commerce_international_export = all_parts_max("commerce_international_export",part_1,part_2,part_3,part_4,part_5);
          
          var max_commerce_international_import = all_parts_max("commerce_international_import",part_1,part_2,part_3,part_4,part_5);
          
          var max_commerce_international_balance = all_parts_max("commerce_international_balance",part_1,part_2,part_3,part_4,part_5);
          
          var max_balance_paiements = all_parts_max("balance_paiements",part_1,part_2,part_3,part_4,part_5);

          all_maxes = 
          {
            "max_PIB"                           : max_PIB,
            "max_taux_PIB"                      : max_taux_PIB,
            "max_PIB_par_habitant"              : max_PIB_par_habitant,
            "max_pourcentage_va_agriculture"    : max_pourcentage_va_agriculture,
            "max_pourcentage_va_industrie"      : max_pourcentage_va_industrie,
            "max_services_et_autres"            : max_services_et_autres,
            "max_taux_emploi_agriculture"       : max_taux_emploi_agriculture,
            "max_taux_emploi_industrie"         : max_taux_emploi_industrie,
            "max_taux_emploi_services"          : max_taux_emploi_services,
            "max_taux_chomage"                  : max_taux_chomage,
            "max_population_active_femmes"      : max_population_active_femmes,
            "max_population_active_hommes"      : max_population_active_hommes,
            "max_IPC"                           : max_IPC,
            "max_indice_production_agricole"    : max_indice_production_agricole,
            "max_indice_production_industrielle": max_indice_production_industrielle,
            "max_commerce_international_export" : max_commerce_international_export,
            "max_commerce_international_import" : max_commerce_international_import,
            "max_commerce_international_balance": max_commerce_international_balance,
            "max_balance_paiements"             : max_balance_paiements,
          };


          ////////////////////////////////////////////////////////
           // MINIMUMS ////////////////////////////////////////////
          ////////////////////////////////////////////////////////
          function list_min(a,tableau) {
            var min1 = Math.min.apply(Math, (tableau.filter(el => (el.Indicateur === a))).map(function(o) { return o.valeur_2005; }));
            var min2 = Math.min.apply(Math, (tableau.filter(el => (el.Indicateur === a))).map(function(o) { return o.valeur_2010; }));
            var min3 = Math.min.apply(Math, (tableau.filter(el => (el.Indicateur === a))).map(function(o) { return o.valeur_2019; }));

            return Math.min(min1,min2,min3);
          }

          var part_1 = [...donnees_benin,...donnees_burkina,...donnees_cabo_verde];
          var part_2 = [...donnees_cote_divoire,...donnees_gambie,...donnees_ghana];
          var part_3 = [...donnees_guinee,...donnees_guinee_bissau,...donnees_liberia];
          var part_4 = [...donnees_mali,...donnees_niger,...donnees_nigeria];
          var part_5 = [...donnees_senegal,...donnees_sierra_leone,...donnees_togo];

          function all_parts_min(modalite,partie1,partie2,partie3,partie4,partie5){
            var lm1 = list_min(modalite,partie1);
            var lm2 = list_min(modalite,partie2);
            var lm3 = list_min(modalite,partie3);
            var lm4 = list_min(modalite,partie4);
            var lm5 = list_min(modalite,partie5);

            return Math.min(lm1,lm2,lm3,lm4,lm5);
          }

          
          var min_PIB = all_parts_min("PIB",part_1,part_2,part_3,part_4,part_5);
          
          var min_taux_PIB = all_parts_min("taux_PIB",part_1,part_2,part_3,part_4,part_5);
          
          var min_PIB_par_habitant = all_parts_min("PIB_par_habitant",part_1,part_2,part_3,part_4,part_5);
          
          var min_pourcentage_va_agriculture = all_parts_min("pourcentage_va_agriculture",part_1,part_2,part_3,part_4,part_5);
          
          var min_pourcentage_va_industrie = all_parts_min("pourcentage_va_industrie",part_1,part_2,part_3,part_4,part_5);
          
          var min_services_et_autres = all_parts_min("services_et_autres",part_1,part_2,part_3,part_4,part_5);
          
          var min_taux_emploi_agriculture = all_parts_min("taux_emploi_agriculture",part_1,part_2,part_3,part_4,part_5);
          
          var min_taux_emploi_industrie = all_parts_min("taux_emploi_industrie",part_1,part_2,part_3,part_4,part_5);
          
          var min_taux_emploi_services = all_parts_min("taux_emploi_services",part_1,part_2,part_3,part_4,part_5);
          
          var min_taux_chomage = all_parts_min("taux_chomage",part_1,part_2,part_3,part_4,part_5);
          
          var min_population_active_femmes = all_parts_min("population_active_femmes",part_1,part_2,part_3,part_4,part_5);
          
          var min_population_active_hommes = all_parts_min("population_active_hommes",part_1,part_2,part_3,part_4,part_5);
          
          var min_IPC = all_parts_min("IPC",part_1,part_2,part_3,part_4,part_5);
          
          var min_indice_production_agricole = all_parts_min("indice_production_agricole",part_1,part_2,part_3,part_4,part_5);

          var min_indice_production_industrielle = all_parts_min("indice_production_industrielle",part_1,part_2,part_3,part_4,part_5);
          
          var min_commerce_international_export = all_parts_min("commerce_international_export",part_1,part_2,part_3,part_4,part_5);
          
          var min_commerce_international_import = all_parts_min("commerce_international_import",part_1,part_2,part_3,part_4,part_5);
          
          var min_commerce_international_balance = all_parts_min("commerce_international_balance",part_1,part_2,part_3,part_4,part_5);
          
          var min_balance_paiements = all_parts_min("balance_paiements",part_1,part_2,part_3,part_4,part_5);

          all_mines = 
          {
            "min_PIB"                           : min_PIB,
            "min_taux_PIB"                      : min_taux_PIB,
            "min_PIB_par_habitant"              : min_PIB_par_habitant,
            "min_pourcentage_va_agriculture"    : min_pourcentage_va_agriculture,
            "min_pourcentage_va_industrie"      : min_pourcentage_va_industrie,
            "min_services_et_autres"            : min_services_et_autres,
            "min_taux_emploi_agriculture"       : min_taux_emploi_agriculture,
            "min_taux_emploi_industrie"         : min_taux_emploi_industrie,
            "min_taux_emploi_services"          : min_taux_emploi_services,
            "min_taux_chomage"                  : min_taux_chomage,
            "min_population_active_femmes"      : min_population_active_femmes,
            "min_population_active_hommes"      : min_population_active_hommes,
            "min_IPC"                           : min_IPC,
            "min_indice_production_agricole"    : min_indice_production_agricole,
            "min_indice_production_industrielle": min_indice_production_industrielle,
            "min_commerce_international_export" : min_commerce_international_export,
            "min_commerce_international_import" : min_commerce_international_import,
            "min_commerce_international_balance": min_commerce_international_balance,
            "min_balance_paiements"             : min_balance_paiements,
          };
          


          var data_set = function(annee,donnees){
            var chart_datas = [];

            var M = 0;
            var T = "";
            var word = "";
            var range;


           
              chart_datas = Array.from({length:donnees.length}, _ => ({modalite:"",titre:"",valeur:0,pourcentage:0}));

              for (var i = 0; i < donnees.length; i++) {
              
                T = String('max_'+donnees[i].Indicateur);
                M = all_maxes[T];

                t = String('min_'+donnees[i].Indicateur);
                m = all_mines[t];

                if(typeof chart_datas[i] !== "undefined"){
                  range = M - m;

                  word = donnees[i].Indicateur;
                  word = word.replace(/_/g, " ");
                  word = word.replace(/taux/g, "%");
                  word = word.replace(/pourcentage/g, "%");
                  word = word.replace(/population/g, "Pop.");
                  word = word.replace(/hommes/g, "♂");
                  word = word.replace(/femmes/g, "♀");
                  word = word.replace(/chomage/g, "chôm.");
                  word = word.replace(/indice/g, "ind.");
                  word = word.replace(/industrielle/g, "industr.");
                  word = word.replace(/industrie/g, "industr.")
                  word = word.replace(/production/g, "prod.");
                  word = word.replace(/commerce international/g, "Com. Inter.");
                  chart_datas[i].titre = word;
                  chart_datas[i].modalite = donnees[i].Indicateur;
                  chart_datas[i].valeur = parseFloat(donnees[i]["valeur_"+annee]);
                  chart_datas[i].pourcentage = (((donnees[i]["valeur_"+annee] - m)*100)/range);
                  
                  
                }
              }
              chart_datas = chart_datas.filter(el => {
                return (el.valeur_2005 !== 0);
              });
            
            return chart_datas;
          }
          
          var data_set_all = function(annee){
            var chart_datas = [];

            var M = 0;
            var T = "";
            var word = "";
            var range;


            for (var y = 0; y < pays.length; y++) {
              // pays[y]
              chart_datas[y] = Array.from({length:modalites.length}, _ => ({modalite:"",titre:"",pays:"",valeur:0,pourcentage:0}));

              if (files[y].length == 19) {
                for (var i = 0; i < files[y].length; i++) {
              
                  T = String('max_'+files[y][i].Indicateur);
                  M = all_maxes[T];

                  t = String('min_'+files[y][i].Indicateur);
                  m = all_mines[t];
                  
                  range = M - m;

                  word = files[y][i].Indicateur;
                  word = word.replace(/_/g, " ");
                  word = word.replace(/taux/g, "%");
                  word = word.replace(/pourcentage/g, "%");
                  word = word.replace(/population/g, "Pop.");
                  word = word.replace(/hommes/g, "♂");
                  word = word.replace(/femmes/g, "♀");
                  word = word.replace(/chomage/g, "chôm.");
                  word = word.replace(/indice/g, "ind.");
                  word = word.replace(/industrielle/g, "industr.");
                  word = word.replace(/industrie/g, "industr.")
                  word = word.replace(/production/g, "prod.");
                  word = word.replace(/commerce international/g, "Com. Inter.");
                  chart_datas[y][i].titre = word;
                  chart_datas[y][i].pays = pays[y];
                  chart_datas[y][i].country = y+1;
                  chart_datas[y][i].variable = i+1;
                  chart_datas[y][i].annee = annee;
                  chart_datas[y][i].modalite = files[y][i].Indicateur;
                  chart_datas[y][i].valeur = parseFloat(files[y][i]["valeur_"+annee]);
                  chart_datas[y][i].pourcentage = (((parseFloat(files[y][i]["valeur_"+annee]) - m)*100)/range);
                    
                    
                  
                }
              }else{
                for (var i = 0; i < modalites.length; i++) {
              
                  T = String('max_'+modalites[i]);
                  M = all_maxes[T];

                  t = String('min_'+modalites[i]);
                  m = all_mines[t];
                  
                  range = M - m;

                  var indicateur = files[y].find(function(d) {return d.Indicateur == modalites[i];});
                  
                  if(typeof indicateur !== "undefined" && typeof files[y][i] !== "undefined"){
                    word = modalites[i];
                    word = word.replace(/_/g, " ");
                    word = word.replace(/taux/g, "%");
                    word = word.replace(/pourcentage/g, "%");
                    word = word.replace(/population/g, "Pop.");
                    word = word.replace(/hommes/g, "♂");
                    word = word.replace(/femmes/g, "♀");
                    word = word.replace(/chomage/g, "chôm.");
                    word = word.replace(/indice/g, "ind.");
                    word = word.replace(/industrielle/g, "industr.");
                    word = word.replace(/industrie/g, "industr.")
                    word = word.replace(/production/g, "prod.");
                    word = word.replace(/commerce international/g, "Com. Inter.");
                    chart_datas[y][i].titre = word;
                    chart_datas[y][i].pays = pays[y];
                    chart_datas[y][i].country = y+1;
                    chart_datas[y][i].variable = i+1;
                    chart_datas[y][i].annee = annee;
                    chart_datas[y][i].modalite = modalites[i];
                    chart_datas[y][i].valeur = parseFloat(files[y][i]["valeur_"+annee]);
                    chart_datas[y][i].pourcentage = (((parseFloat(files[y][i]["valeur_"+annee]) - m)*100)/range);
                  }else{
                    word = modalites[i];
                    word = word.replace(/_/g, " ");
                    word = word.replace(/taux/g, "%");
                    word = word.replace(/pourcentage/g, "%");
                    word = word.replace(/population/g, "Pop.");
                    word = word.replace(/hommes/g, "♂");
                    word = word.replace(/femmes/g, "♀");
                    word = word.replace(/chomage/g, "chôm.");
                    word = word.replace(/indice/g, "ind.");
                    word = word.replace(/industrielle/g, "industr.");
                    word = word.replace(/industrie/g, "industr.")
                    word = word.replace(/production/g, "prod.");
                    word = word.replace(/commerce international/g, "Com. Inter.");
                    chart_datas[y][i].titre = word;
                    chart_datas[y][i].pays = pays[y];
                    chart_datas[y][i].country = y+1;
                    chart_datas[y][i].variable = i+1;
                    chart_datas[y][i].annee = annee;
                    chart_datas[y][i].modalite = modalites[i];
                    chart_datas[y][i].valeur = 0;
                    chart_datas[y][i].pourcentage = 0;
                  }
                  
                    
                    
                  
                }
              }
              chart_datas[y] = chart_datas[y].filter(el => {
                return (el.valeur_2005 !== 0);
              });
            }
            return chart_datas;
          }

        ///////////////////////////////////////////////////////////////////
        // REPRESENTATION DES DONNEES /////////////////////////////////////
        ///////////////////////////////////////////////////////////////////

// Define the div for the tooltip
var div = d3.select("#heatmap").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);


        var dataset;
  var days = data_set(2005,donnees_benin).map(function(d){return d.titre;}),
  times = pays;
  
  var margin = {top:40, right:20, bottom:70, left:105};
  
  // calculate width and height based on window size
  var w = 900,
  gridSize = 25,
  h = 400;

  //reset the overall font size
  
  // svg container
  var svg = d3.select("#heatmap")
    .append("svg")
    .attr("width", w)
    .attr("height", h + margin.left + margin.right)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  // linear colour scale
  var colours = d3.scaleLinear().domain([1,100])
  .range(["white", "green"]);
  
  var dayLabels = svg.selectAll(".dayLabel")
    .data(days)
    .enter()
    .append("text")
    .style("font-size","10px")
    .text(function(d) { return d; })
    .attr("x", 0)
    .attr("y", function(d, i) { return i * gridSize; })
    .style("text-anchor", "end")
    .attr("transform", "translate(-6," + gridSize / 1.5 + ")")

  var timeLabels = svg.selectAll(".timeLabel")
    .data(times)
    .enter()
    .append("text")
    .style("font-size","9px")
    .text(function(d) { return d; })
    .attr("x", function(d, i) { return i * gridSize*2; })
    .attr("y", 0)
    .style("text-anchor", "middle")
    .attr("transform", "translate(" + gridSize + ", -6)");

  // load data
  var db1 = data_set_all(2005);
  var data1 = [...db1[0],...db1[1],...db1[2],...db1[3],...db1[4],...db1[5],...db1[6],...db1[7],...db1[8],...db1[9],...db1[10],...db1[11],...db1[12],...db1[13],...db1[14]];

  var db2 = data_set_all(2010);
  var data2 = [...db2[0],...db2[1],...db2[2],...db2[3],...db2[4],...db2[5],...db2[6],...db2[7],...db2[8],...db2[9],...db2[10],...db2[11],...db2[12],...db2[13],...db2[14]];

  var db3 = data_set_all(2019);
  var data3 = [...db3[0],...db3[1],...db3[2],...db3[3],...db3[4],...db3[5],...db3[6],...db3[7],...db3[8],...db3[9],...db3[10],...db3[11],...db3[12],...db3[13],...db3[14]];
    
  var data = [...data1,...data2,...data3];
    data.forEach(function(d) {
        d.variable = +d.variable;
        d.country = +d.country;
        d.valeur = +d.valeur;
    });
    dataset = data;
    console.log(dataset);

    // group data by location
    var nest = d3.nest()
      .key(function(d) { return d.annee; })
      .entries(dataset);

    // array of locations in the data
    var locations = nest.map(function(d) { return d.key; });
    var currentLocationIndex = 0;

    // create location dropdown menu
    var locationMenu = d3.select("#locationDropdown");
    locationMenu
      .append("select")
      .attr("id", "locationMenu")
      .selectAll("option")
        .data(locations)
        .enter()
        .append("option")
        .attr("value", function(d, i) { return i; })
        .text(function(d) { return d; });

    // function to create the initial heatmap
    var drawHeatmap = function(location) {

      // filter the data to return object of location of interest
      var selectLocation = nest.find(function(d) {
        return d.key == location;
      });

      var heatmap = svg.selectAll(".country")
        .data(selectLocation.values)
        .enter()
        .append("rect")
        .attr("x", function(d) { return (d.country-1) * gridSize*2; })
        .attr("y", function(d) { return (d.variable-1) * gridSize; })
        .attr("class", "country bordered")
        .attr("width", (gridSize*2))
        .attr("height", gridSize)
        .style("stroke", "white")
        .style("stroke-width", 1)
        .style("stroke-opacity", 0.6)
        .style("fill", function(d) { return colours(d.pourcentage); })
        .on("mouseover", function(d) {
            d3.select(this)
            // .style("fill", d3.rgb(colours(d.pourcentage)).darker(2))
            .style("stroke", "black")
            .style("stroke-width", 3)
            .style("stroke-opacity", 1);
            div.transition()        
                .duration(200)      
                .style("opacity", .9);      
            div.html("<b>"+ d.pays +"</b><br><b>"+ d.titre +"</b> : "+ d.valeur +"<br><b>Année</b> : "+ d.annee)  
                .style("left", (d3.event.pageX*0.5) + "px")     
                .style("top", (d3.event.pageY*0.5) + "px")
                .style("background", d3.rgb(colours(d.pourcentage)));

                var data = [{"color":"white","value":parseFloat(all_mines["min_"+d.modalite])},{"color":"green","value":parseFloat(all_maxes["max_"+d.modalite])}];
                var extent = [data[0].value,data[1].value];
                
                var padding = 20;
                var width = 400;
                var innerWidth = width - (padding * 4);
                var barHeight = 8;
                var height = 28;

                var xScale = d3.scaleLinear()
                    .range([0, innerWidth])
                    .domain(extent);

                var xTicks = [data[0].value,data[1].value];

                var xAxis = d3.axisBottom(xScale)
                    .tickSize(barHeight * 2)
                    .tickValues(xTicks);

                var svg = d3.select("#heatmap")
                            .append("svg")
                            .attr("id", "legende")
                            .attr("width", width)
                            .attr("height", height);
                var g = svg.append("g").attr("transform", "translate(" + (padding+20) + ", 0)");

                var defs = svg.append("defs");
                var linearGradient = defs.append("linearGradient").attr("id", "myGradient");
                linearGradient.selectAll("stop")
                    .data(data)
                  .enter().append("stop")
                    .attr("offset", d => ((d.value - extent[0]) / (extent[1] - extent[0]) * 100) + "%")
                    .attr("stop-color", d => d.color);

                g.append("rect")
                    .attr("width", innerWidth)
                    .attr("height", barHeight)
                    .style("fill", "url(#myGradient)");

                g.append("g")
                    .call(xAxis)
                  .select(".domain").remove();

        })
        .on("mouseout", function(d) {
            d3.select(this).style("fill", function(d) { return colours(d.pourcentage)})
            .style("stroke", "white")
            .style("stroke-width", 1)
            .style("stroke-opacity", 0.6);
            div.transition()        
            .duration(500)      
            .style("opacity", 0);
            d3.selectAll("#legende").remove();
        });
      }
    drawHeatmap(locations[currentLocationIndex]);

    var updateHeatmap = function(location) {
      // console.log("currentLocationIndex: " + currentLocationIndex)
      // filter data to return object of location of interest
      var selectLocation = nest.find(function(d) {
        return d.key == location;
      });

      // update the data and redraw heatmap
      var heatmap = svg.selectAll(".country")
        .data(selectLocation.values)
        .transition()
          .duration(500)
          .style("fill", function(d) { return colours(d.pourcentage); })
    }

    // run update function when dropdown selection changes
    locationMenu.on("change", function() {
      // find which location was selected from the dropdown
      var selectedLocation = d3.select(this)
        .select("select")
        .property("value");
      currentLocationIndex = +selectedLocation;
      // run update function with selected location
      updateHeatmap(locations[currentLocationIndex]);
    });    

    // d3.selectAll(".nav").on("click", function() {
    //   if(d3.select(this).classed("left")) {
    //     if(currentLocationIndex == 0) {
    //       currentLocationIndex = locations.length-1;
    //     } else {
    //       currentLocationIndex--;  
    //     }
    //   } else if(d3.select(this).classed("right")) {
    //     if(currentLocationIndex == locations.length-1) {
    //       currentLocationIndex = 0;
    //     } else {
    //       currentLocationIndex++;  
    //     }
    //   }
    //   d3.select("#locationMenu").property("value", currentLocationIndex)
    //   updateHeatmap(locations[currentLocationIndex]);
    // })

    
// console.log();
        
    });
    }
      
 




