/**
 * Gathers from numbers from a piece of text
 *
 * @class Address
 * @author Robert Langton
 */
class KnowAddress {
    
    /**
     * Creates an instance of Address.
     * Also creates our regex etc.
     * @param {KnowParser}  knowParser The KnowParser instance
     * @memberof KnowAddress
     */
    constructor(knowParser) {
        /*
            There must be a to be a 1-1 correspondance between countries
            in cityRegex and countries in streetRegex.
            The list of cities/towns for each country was collected 
            from www.britannica.com
            &#xFC; = ü
            &#xDF; = ß
        */
        this.cityRegex = [
            //Dutch
            new RegExp([
                'Drenthe|Assen|Coevorden|Emmen|Hoogeveen|Meppel',
                '|Almere|Biddinghuizen|Emmeloord|Lelystad|Bolsward|Dokkum',
                '|Franeker|Harlingen|Hindeloopen|IJlst|Leeuwarden|Sloten',
                '|Sneek|Stavoren|Workum|Apeldoorn|Arnhem|Bredevoort|Buren',
                '|Culemborg|Dieren|Doetinchem|Ede|Enspijk|Gendt|Groenlo',
                '|Harderwijk|Hattem|Heukelum|Huissen|Nijkerk|Nijmegen|Staverden',
                '|Tiel|Ulft|Voorst|Wageningen|Wijchen|Winterswijk|Zaltbommel|Den Haag',
                '|Zevenaar|Zutphen|Appingedam|Delfzijl|Groningen|Hoogezand-Sappemeer',
                '|Stadskanaal|Veendam|Winschoten|Limburg|Echt|Geleen|Gennep|Heerlen',
                '|Kerkrade|Kessel|Landgraaf|Maastricht|Montfort|Nieuwstadt|Roermond',
                '|Schin op Geul|Sittard|Stein|Susteren|Thorn|Vaals|Valkenburg|Venlo|Weert',
                '|North Brabant|Bergen op Zoom|Boxtel|Breda|Eindhoven|Geertruidenberg|Geldrop',
                '|Grave|Helmond|Heusden|Klundert|Oosterhout|Oss|Ravenstein|Roosendaal',
                '|Sint-Oedenrode|Tilburg|Valkenswaard|Veldhoven|Waalwijk|Willemstad|Woudrichem',
                '|Alkmaar|Amstelveen|Amsterdam|Den Helder|Diemen|Edam|Enkhuizen|Haarlem|Heerhugowaard',
                '|Hilversum|Hoofddorp|Hoorn|Laren|Medemblik|Monnickendam|Muiden|Naarden|Purmerend',
                '|Schagen|Velsen|Volendam|Weesp|Zaanstad|Overijssel|Almelo|Blokzijl|Deventer|Enschede',
                '|Genemuiden|Hasselt|Hengelo|Kampen|Oldenzaal|Rijssen|Steenwijk|Vollenhove|Zwolle',
                '|Alphen aan den Rijn|Capelle aan den IJssel|Delft|Dordrecht|Gorinchem|Gouda|Leiden',
                '|Maassluis|Rotterdam|Schiedam|Spijkenisse|The Hague|Vlaardingen|Zoetermeer|Utrecht',
                '|Amersfoort|Baarn|Bunschoten|Eemnes|Hagestein|Houten|Leerdam|Montfoort|Nieuwegein',
                '|Oudewater|Rhenen|Utrecht|Veenendaal|Vianen|Wijk bij Duurstede|Woerden|IJsselstein',
                '|Zeist|Arnemuiden|Goes|Hulst|Middelburg|Sluis|Terneuzen|Veere|Vlissingen|Zierikzee'
            ].join(), 'i'),
            //English
            new RegExp([
                'Bedford|Blackburn with Darwen|Blackpool|Bournemouth|Bracknell Forest',
                '|Sandhurst|Brighton and Hove|Brighton|Hove|Bristol|Buckinghamshire|Aylesbury Vale',
                '|Aylesbury|Chiltern|Amersham|Chalfont St. Giles|South Bucks|Beaconsfield|Stoke Poges',
                '|Wycombe|High Wycombe|Marlow|Cambridgeshire|East Cambridgeshire|Ely|Fenland|Wisbech',
                '|Huntingdonshire|Huntingdon|Ramsey|St. Ives|South Cambridgeshire|Cambridge',
                '|Central Bedfordshire|Ampthill|Dunstable|Cheshire East|Congleton|Crewe',
                '|Knutsford|Macclesfield|Nantwich|Cheshire West and Chester|Chester|Northwich',
                '|Cornwall|Bodmin|Falmouth|Fowey|Helston|Launceston|Looe|Lostwithiel|Newquay',
                '|Penryn|Penzance|St. Austell|Saltash|Tintagel|Truro|Cumbria|Allerdale|Cockermouth',
                '|Keswick|Workington|Barrow-in-Furness|Carlisle|Copeland|Whitehaven|Eden|Penrith',
                '|South Lakeland|Grasmere|Kendal|Darlington|Derby|Derbyshire|Amber Valley|Belper',
                '|Bolsover|Chesterfield|Derbyshire Dales|Ashbourne|Matlock|Erewash|High Peak|Buxton',
                '|North East Derbyshire|South Derbyshire|Repton|Devon|East Devon|Axminster|Exmouth',
                '|Sidmouth|Exeter|Mid Devon|Crediton|North Devon|Barnstaple|Lynton and Lynmouth',
                '|South Hams|Dartmouth|Totnes|Teignbridge|Ashburton|Dawlish|Newton Abbot|Teignmouth',
                '|Torridge|Bideford|West Devon|Okehampton|Dorset|Christchurch|East Dorset',
                '|Wimborne Minster|North Dorset|Purbeck|Corfe Castle|West Dorset|Dorchester',
                '|Lyme Regis|Weymouth and Portland|Durham|Barnard Castle|Chester-le-Street|Durham',
                '|East Riding of Yorkshire|Beverley|Goole|East Sussex|Eastbourne|Hastings|Lewes',
                '|Lewes|Newhaven|Rother|Battle|Bexhill|Rye|Winchelsea|Wealden|Crowborough',
                '|Herstmonceux|Pevensey|Essex|Basildon|Braintree|Brentwood|Castle Point|Chelmsford',
                '|Colchester|Epping Forest|Chigwell|Harlow|Maldon|Burnham-on-Crouch|Rochford',
                '|Tendring|Harwich|Uttlesford|Saffron Walden|Gloucestershire|Cheltenham|Cotswold',
                '|Cirencester|Forest of Dean|Gloucester|Stroud|Tewkesbury|Tewkesbury|Winchcombe',
                '|Camden|Bloomsbury|London|Smithfield',
                '|City of Westminster|Charing Cross|St. Marylebone|Soho|Hackney|Hammersmith and Fulham',
                '|Haringey|Islington|Clerkenwell|Kensington and Chelsea|Lambeth|Vauxhall|Lewisham',
                '|Newham|Southwark|Dulwich|Tower Hamlets|Limehouse|Wandsworth|Battersea',
                '|Barking and Dagenham|Barnet|Bexley|Brent|Bromley|Croydon|Ealing|Enfield|Greenwich',
                '|Woolwich|Harrow|Havering|Hillingdon|Hounslow|Kingston upon Thames|Teddington|Merton',
                '|Wimbledon|Redbridge|Richmond upon Thames|Sutton|Waltham Forest|Greater Manchester',
                '|Bolton|Bury|Manchester|Oldham|Rochdale|Salford|Stockport|Tameside|Trafford|Wigan',
                '|Atherton|Halton|Runcorn|Widnes|Hampshire|Basingstoke and Deane|Silchester',
                '|East Hampshire|Alton|Eastleigh|Fareham|Gosport|Hart|Havant|New Forest|Rushmoor',
                '|Test Valley|Andover|Romsey|Winchester|Hartlepool|Herefordshire|Hereford|Leominster',
                '|Ross-on-Wye|Hertfordshire|Broxbourne|Dacorum|Berkhamsted|Hemel Hempstead',
                '|East Hertfordshire|Bishop’s Stortford|Hertford|Ware|Hertsmere|North Hertfordshire',
                '|Letchworth|St. Albans|Stevenage|Three Rivers|Watford|Welwyn Hatfield|Hatfield',
                '|Welwyn Garden City|Isle of Wight|Carisbrooke|Cowes|Freshwater|Newport|Ryde|Ventnor',
                '|Isles of Scilly|Hugh Town|Kent|Ashford|Canterbury|Herne Bay|Whitstable|Dartford',
                '|Dover|Deal|Dover|Sandwich|Gravesham|Gravesend|Maidstone|Sevenoaks|Edenbridge|Shepway',
                '|Folkestone|Hythe|Lydd|New Romney|Swale|Faversham|Thanet|Broadstairs and St. Peter’s',
                '|Margate|Ramsgate|Tonbridge and Malling|Tunbridge Wells|Royal Tunbridge Wells',
                '|Kingston upon Hull|Lancashire|Burnley|Chorley|Fylde|Hyndburn|Lancaster|Pendle',
                '|Preston|Walton-le-Dale|Ribble Valley|Rossendale|South Ribble|West Lancashire',
                '|Skelmersdale|Wyre|Leicester|Leicestershire|Blaby|Charnwood|Loughborough|Harborough',
                '|Market Harborough|Hinckley and Bosworth|Melton|North West Leicestershire',
                '|Oadby and Wigston|Lincolnshire|Boston|East Lindsey|Lincoln|North Kesteven',
                '|South Kesteven|Grantham|Stamford|South Holland|Crowland|West Lindsey|Gainsborough',
                '|Luton|Medway|Chatham|Gillingham|Rochester|Merseyside|Knowsley|Huyton|Liverpool',
                '|St. Helens|Sefton|Southport|Wirral|Birkenhead|Middlesbrough|Milton Keynes|Norfolk',
                '|Breckland|East Dereham|Thetford|Broadland|Great Yarmouth|King’s Lynn and West Norfolk',
                '|Castle Rising|King’s Lynn|Sandringham|North Norfolk|Norwich|South Norfolk',
                '|North East Lincolnshire|Cleethorpes|Grimsby|North Lincolnshire|Scunthorpe',
                '|North Somerset|Weston-super-Mare|North Yorkshire|Craven|Hambleton|Northallerton',
                '|Harrogate|Knaresborough|Ripon|Richmondshire|Richmond|Ryedale|Malton|Scarborough',
                '|Whitby|Selby|Northamptonshire|Corby|Daventry|East Northamptonshire|Oundle|Kettering',
                '|Northampton|South Northamptonshire|Wellingborough|Northumberland|Bamburgh|Bedlington',
                '|Cramlington|Hexham|Morpeth|Warkworth|Nottingham|Nottinghamshire|Ashfield|Bassetlaw',
                '|Worksop|Broxtowe|Beeston and Stapleford|Gedling|Mansfield|Newark and Sherwood',
                '|Newark-on-Trent|Rushcliffe|West Bridgford|Oxfordshire|Cherwell|Banbury|Bicester',
                '|Oxford|South Oxfordshire|Henley-on-Thames|Vale of White Horse|Wantage|West Oxfordshire',
                '|Burford|Peterborough|Plymouth|Poole|Portsmouth|Reading|Redcar and Cleveland|Rutland',
                '|Uppingham|Shropshire|Bridgnorth|Ludlow|Much Wenlock|Oswestry|Shrewsbury|Stokesay',
                '|Slough|Somerset|Mendip|Glastonbury|Wells|Sedgemoor|Bridgwater|Cheddar|South Somerset',
                '|Ilchester|Langport|Taunton Deane|Taunton|Wellington|West Somerset|Dunster|Minehead',
                '|South Gloucestershire|Badminton|Kingswood|South Yorkshire|Barnsley|Doncaster|Adwick le Street',
                '|Rotherham|Sheffield|Southampton|Southend-on-Sea|Staffordshire|Cannock Chase|East Staffordshire',
                '|Burton upon Trent|Lichfield|Newcastle-under-Lyme|South Staffordshire|Stafford',
                '|Staffordshire Moorlands|Tamworth|Stockton-on-Tees|Stoke-on-Trent|Suffolk|Babergh',
                '|Sudbury|Forest Heath|Mildenhall|Newmarket|Ipswich|Mid Suffolk|St. Edmundsbury',
                '|Bury St. Edmunds|Suffolk Coastal|Dunwich|Felixstowe|Woodbridge|Waveney|Beccles',
                '|Lowestoft|Surrey|Elmbridge|Epsom and Ewell|Guildford|Mole Valley|Dorking',
                '|Reigate and Banstead|Runnymede|Spelthorne|Staines|Surrey Heath|Tandridge',
                '|Waverley|Haslemere|Woking|Swindon|Telford and Wrekin|Telford|Thurrock|Tilbury',
                '|Torbay|Brixham|Tyne and Wear|Gateshead|Felling|Newcastle upon Tyne|Newburn',
                '|North Tyneside|Wallsend|South Tyneside|Jarrow|South Shields|Sunderland|Washington',
                '|Warrington|Warwickshire|North Warwickshire|Nuneaton and Bedworth|Bedworth|Rugby',
                '|Stratford-on-Avon|Warwick|Royal Leamington Spa|Warwick|West Berkshire|Newbury',
                '|West Midlands|Birmingham|Coventry|Dudley|Sandwell|West Bromwich|Solihull|Walsall',
                '|Wolverhampton|West Sussex|Adur|Shoreham-by-Sea|Arun|Arundel|Bognor Regis|Chichester',
                '|Petworth|Crawley|Horsham|Mid Sussex|East Grinstead|Worthing|West Yorkshire|Bradford',
                '|Haworth|Keighley|Saltaire|Calderdale|Halifax|Todmorden|Kirklees|Dewsbury|Huddersfield',
                '|Leeds|Wakefield|Pontefract|Wiltshire|Amesbury|Bradford-on-Avon|Chippenham|Cricklade',
                '|Devizes|Malmesbury|Marlborough|Salisbury|Trowbridge|Westbury|Wilton|Windsor and Maidenhead',
                '|Ascot|Bray|Eton|Maidenhead|Windsor|Wokingham|Worcestershire|Bromsgrove|Malvern Hills',
                '|Great Malvern|Redditch|Worcester|Wychavon|Broadway|Droitwich|Evesham|Wyre Forest',
                '|Kidderminster|York|Northern Ireland|Antrim and Newtownabbey|Antrim|Newtownabbey',
                '|Ards and North Down|Newtownards|Bangor|Armagh, Banbridge, and Craigavon|Armagh',
                '|Banbridge|Dromore|Craigavon|Lurgan|Belfast|Stormont|Causeway Coast and Glens',
                '|Ballycastle|Ballymoney|Coleraine|Portrush|Limavady|Derry and Strabane',
                '|Strabane|Fermanagh and Omagh|Enniskillen|Omagh|Lisburn and Castlereagh|Lisburn|Mid and East Antrim',
                '|Ballymena|Carrickfergus|Larne|Mid Ulster|Cookstown|Dungannon|Magherafelt|Newry, Mourne, and Down',
                '|Downpatrick|Kilkeel|Newcastle|Newry|Scotland|Aberdeen|Aberdeenshire|Banff|Braemar|Cruden Bay',
                '|Peterhead|St. Fergus|Angus|Arbroath|Brechin|Forfar|Glamis|Montrose|Argyll and Bute|Campbeltown',
                '|Dunoon|Inveraray|Lochgilphead|Rothesay|Tarbert|Clackmannanshire|Dumfries and Galloway|Dumfries',
                '|Gretna Green|Kirkcudbright|Lochmaben|Whithorn|Dundee|East Ayrshire|Cumnock|Kilmarnock',
                '|Mauchline|East Dunbartonshire|Kirkintilloch|Milngavie|East Lothian|Dunbar|Haddington',
                '|East Renfrewshire|Edinburgh|Leith (port)|Falkirk|Falkirk|Grangemouth|Fife|Buckhaven',
                '|Culross|Cupar|Dunfermline|Glenrothes|Kirkcaldy|Rosyth|St. Andrews|Glasgow|Highland',
                '|Alness|Cawdor|Cromarty|Fort William|Invergordon|Inverness|John o’Groats|Nigg|Thurso|Wick',
                '|Inverclyde|Greenock|Midlothian|Dalkeith|Moray|Elgin|Forres|Lossiemouth|North Ayrshire',
                '|Irvine|North Lanarkshire|Coatbridge|Cumbernauld|Motherwell and Wishaw|Orkney Islands',
                '|Kirkwall|Perth and Kinross|Dunkeld|Kinross|Perth|Scone|Renfrewshire|Paisley|Renfrew',
                '|Scottish Borders|Coldstream|Duns|Galashiels|Hawick|Jedburgh|Kelso|Melrose',
                '|Newtown St. Boswells|Peebles|Selkirk|Shetland Islands|Lerwick|Sullom Voe|South Ayrshire',
                '|Ayr|Alloway|Prestwick|South Lanarkshire|East Kilbride|Hamilton|Lanark|Stirling|Balquhidder',
                '|Bannockburn|Callander|Stirling|West Dunbartonshire|Clydebank|Dumbarton|West Lothian',
                '|Linlithgow|Livingston|Western Isles|Stornoway|Wales|Blaenau Gwent|Abertillery|Ebbw Vale',
                '|Bridgend|Bridgend|Porthcawl|Caerphilly|Caerphilly|Gelligaer|Cardiff|Llandaff|Carmarthenshire',
                '|Carmarthen|Llanelli|Ceredigion|Aberystwyth|Cardigan|Conwy|Colwyn Bay|Conwy|Llandudno',
                '|Denbighshire|Denbigh|Rhyl|St. Asaph|Flintshire|Hawarden|Holywell|Gwynedd|Bala',
                '|Bangor|Caernarfon|Harlech|Isle of Anglesey|Holyhead|Llangefni|Merthyr Tydfil',
                '|Monmouthshire|Abergavenny|Chepstow|Monmouth|Usk|Neath Port Talbot|Margam|Neath',
                '|Pontardawe|Port Talbot|Newport|Caerleon|Pembrokeshire|Haverfordwest|Milford Haven',
                '|Pembroke|St. David’s|Tenby|Powys|Brecon|Builth Wells|Llandrindod Wells|Montgomery',
                '|Newtown|Welshpool|Rhondda Cynon Taf|Aberdare|Hirwaun|Llantrisant|Mountain Ash|Pontypridd',
                '|Swansea|Swansea|Torfaen|Cwmbrân|Pontypool|Vale of Glamorgan|Barry|Cowbridge|Llantwit Major|Wrexham'
            ].join(), 'i'),
            //French
            new RegExp([
                'Colmar|Haguenau|Mulhouse|Ribeauvill&#xE9;|Strasbourg|Agen|Bayonne|Bergerac|Biarritz',
                '|Bordeaux|Dax|Lacq|Libourne|Mont-de-Marsan|Pau|P&#xE9;rigueux|Pessac|Saint-Jean-de-Luz',
                '|Talence|Aurillac|Clermont-Ferrand|Le Puy-en-Velay|Montluçon|Moulins|Riom|Vichy',
                '|Alençon|Arromanches|Avranches|Bayeux|B&#xE9;nouville|Caen|Cherbourg|Courseulles|Coutances',
                '|Deauville|Falaise|Grandcamp-Maisy|Granville|Honfleur|Lisieux|Ouistreham|Saint-Lô',
                '|Sainte-Marie-du-Mont|Sainte-Mère-&#xE9;glise|Trouville|Auray|Brest|Carnac|Dinan|Dinard',
                '|Douarnenez|Fougères|Guingamp|Locmariaquer|Lorient|Morlaix|Quimper|Rennes|Saint-Brieuc',
                '|Saint-Malo|Vannes|Autun|Auxerre|Beaune|Chalon-sur-Saône|Cîteaux|Cluny|Dijon|Le Creusot',
                '|Mâcon|Nevers|Sens|V&#xE9;zelay|Amboise|Azay-le-Rideau|Beaugency|Blois|Bourges|Chambord|Chartres',
                '|Châteauroux|Chenonceaux|Chinon|Dreux|Langeais|Loches|Orl&#xE9;ans|Saint-Amand-Montrond',
                '|Saint-Benoît-sur-Loire|Sancerre|Tours|Vendôme|Vierzon|Villandry|Châlons-en-Champagne',
                '|Charleville-M&#xE9;zières|Chaumont|Clairvaux|&#xE9;pernay|Langres|Reims|Rocroi|Saint-Dizier|Sedan',
                '|Troyes|Corsica|Ajaccio|Bastia|Bonifacio|Corte|Belfort|Besançon|Dole|Lons-le-Saunier',
                '|Montb&#xE9;liard|Vesoul|French Guiana|Cayenne|Kourou|Mana|Saint-Laurent du Maroni|Guadeloupe',
                '|Basse-Terre|Pointe-à-Pitre|Dieppe|Elbeuf|&#xE9;vreux|F&#xE9;camp|Gisors|Jumièges|Le Havre',
                '|Le Petit-Quevilly|Lillebonne|Rouen|Argenteuil|Athis-Mons|Champigny-sur-Marne|Charenton-le-Pont',
                '|Châtillon|Chatou|Chelles|Clichy|Colombes|Corbeil-Essonnes|Courbevoie|Cr&#xE9;teil|Drancy',
                '|&#xE9;pinay-sur-Seine|&#xE9;tampes|&#xE9;vry|Fontainebleau|Fresnes|Gagny|Gennevilliers|Issy-les-Moulineaux',
                '|Ivry-sur-Seine|Levallois-Perret|Malakoff|Meaux|Melun|Meudon|Montreuil|Montrouge|Nanterre',
                '|Nemours|Neuilly-sur-Seine|Paris|Poissy|Pontoise|Provins|Puteaux|Rambouillet|Rueil-Malmaison',
                '|Saint-Cloud|Saint-Denis|Saint-Germain-en-Laye|Saint-Maur-des-Foss&#xE9;s|Saint-Ouen|S&#xE9;nart|Sèvres',
                '|Suresnes|Versailles|Villejuif|Villeneuve-Saint-Georges|Vincennes|Viry-Châtillon|Vitry-sur-Seine',
                '|Aigues-Mortes|Alès|Beaucaire|B&#xE9;ziers|Carcassonne|Mende|Montpellier|Narbonne|Nîmes|Perpignan|Sète',
                '|Aubusson|Brive-la-Gaillarde|Gu&#xE9;ret|Limoges|Oradour-sur-Glane|Saint-Yrieix-la-Perche|Tulle|Bar-le-Duc',
                '|Domr&#xE9;my-la-Pucelle|&#xE9;pinal|Forbach|Longwy|Lun&#xE9;ville|Metz|Nancy|Remiremont|Saint-Di&#xE9;|Saint-Mihiel',
                '|Thionville|Toul|Verdun|Martinique|Fort-de-France|La Trinit&#xE9;|Saint-Pierre|Mayotte|Albi|Auch|Cahors',
                '|Castres|Foix|Gavarnie|Lourdes|Millau|Montauban|Rocamadour|Rodez|Saint-Affrique|Tarbes|Toulouse',
                '|Armentières|Arras|B&#xE9;thune|Boulogne|Calais|Cambrai|Croix|Douai|Dunkirk|Gravelines|Henin-Beaumont',
                '|Hesdin|Le Touquet-Paris-Plage|Lens|Li&#xE9;vin|Lille|Marcq-en-Baroeul|Maubeuge|Roubaix',
                '|Saint-Amand-les-Eaux|Saint-Omer|Tourcoing|Valenciennes|Wattrelos|Angers|Cholet|Fontevrault-l’Abbaye',
                '|La Baule-Escoublac|La Roche-sur-Yon|Laval|Le Mans|Nantes|Rez&#xE9;|Saint-Nazaire|Saumur|Solesmes',
                '|Abbeville|Amiens|Beauvais|Chantilly|Château-Thierry|Compiègne|Coucy|Creil|Ham|Laon|Noyon|Saint-Quentin',
                '|Senlis|Soissons|Angoulême|Châtellerault|Cognac|La Rochelle|Niort|Poitiers|Rochefort|Aix-en-Provence',
                '|Antibes|Arles|Aubagne|Avignon|Briançon|Cannes|Digne-les-Bains|Fos|Fr&#xE9;jus|Gap|Grasse|Hyères|La Seyne-sur-Mer',
                '|Les Baux-en-Provence|Marseille|Martigues|Menton|Nice|Orange|Saintes-Maries-de-la-Mer|Salon-de-Provence',
                '|Tarascon|Villefranche-sur-Mer|R&#xE9;union|Saint-Denis|Aix-les-Bains|Annecy|Bourg-en-Bresse|Chamb&#xE9;ry',
                '|Chamonix-Mont-Blanc|Courchevel|&#xE9;vian-les-Bains|Firminy|Grenoble|Le Chambon-Feugerolles|Lyon',
                '|Mont&#xE9;limar|Oullins|Roanne|Romans-sur-Isère|Saint-&#xE9;tienne|Thonon-les-Bains|Valence|Villefranche-sur-Saône|Villeurbanne'
            ].join(), 'i'),
            //German
            new RegExp([
                'Aalen|Bad Mergentheim|Baden-Baden|Bruchsal|Esslingen|Freiburg im Breisgau|Freudenstadt|Friedrichshafen|Göppingen',
                '|Hechingen|Heidelberg|Heilbronn|Karlsruhe|Konstanz|Ludwigsburg|Mannheim|Offenburg|Pforzheim|Ravensburg|Reutlingen',
                '|Schwäbisch Gm&#xFC;nd|Schwäbisch Hall|Stuttgart|T&#xFC;bingen|Ulm|Bavaria|Amberg|Ansbach|Aschaffenburg|Augsburg',
                '|Bad Reichenhall|Bamberg|Bayreuth|Berchtesgaden|Coburg|Dachau|Deggendorf|Dinkelsb&#xFC;hl|Donauwörth|Erlangen',
                '|Freising|F&#xFC;rth|F&#xFC;ssen|Garmisch-Partenkirchen|Ingolstadt|Kempten|Landshut|Lindau|Memmingen|Mittenwald|Munich',
                '|Nördlingen|N&#xFC;rnberg|Passau|Regensburg|Rothenburg ob der Tauber|W&#xFC;rzburg|Berlin|Berlin|Brandenburg|Brandenburg',
                '|Cottbus|Eberswalde|Frankfurt an der Oder|Potsdam|Schwedt|Bremen|Bremen|Bremerhaven|Hamburg|Hamburg|Hessen',
                '|Bad Homburg|Darmstadt|Frankfurt am Main|Fulda|Giessen|Hanau|Kassel|Lorsch|Marburg|Offenbach|R&#xFC;desheim|Wiesbaden',
                '|Lower Saxony|Bad Gandersheim|Bad Harzburg|Braunschweig|Celle|Cuxhaven|Delmenhorst|Emden|Goslar|Göttingen|Hameln',
                '|Hannover|Helmstedt|Hildesheim|L&#xFC;neburg|Oldenburg|Osnabr&#xFC;ck|Salzgitter|Stade|Wilhelmshaven|Wolfsburg',
                '|Mecklenburg-West Pomerania|Greifswald|G&#xFC;strow|Neubrandenburg|Peenem&#xFC;nde|Rostock|Schwerin|Stralsund|Wismar',
                '|North Rhine-Westphalia|Aachen|Arnsberg|Bad Godesberg|Bergisch Gladbach|Bielefeld|Bocholt|Bochum|Bonn|Bottrop|Br&#xFC;hl',
                '|Castrop-Rauxel|Cologne|Detmold|Dorsten|Dortmund|Duisburg|D&#xFC;ren|D&#xFC;sseldorf|Essen|Gelsenkirchen|Gladbeck|G&#xFC;tersloh',
                '|Hagen|Hamm|Herne|H&#xFC;rth|Iserlohn|J&#xFC;lich|Kleve|Königswinter|Krefeld|Leverkusen|L&#xFC;denscheid|L&#xFC;nen|Marl|Minden|Moers',
                '|Mönchengladbach|M&#xFC;lheim an der Ruhr|M&#xFC;nster|Neuss|Paderborn|Recklinghausen|Remscheid|Rheine|Siegen|Soest|Solingen',
                '|Wesel|Witten|Wuppertal|Rhineland-Palatinate|Bad Kreuznach|Bingen|Boppard|Frankenthal|Kaiserslautern|Koblenz|Landau',
                '|Ludwigshafen|Mainz|Speyer|Trier|Worms|Saarland|Homburg|Reinheim|Saarbr&#xFC;cken|Saarlouis|Saxony|Altenburg',
                '|Annaberg-Buchholz|Bautzen|Chemnitz|Dresden|Freiberg|Görlitz|Hoyerswerda|Leipzig|Meissen|Torgau|Zittau|Zwickau',
                '|Saxony-Anhalt|Bernburg|Dessau|Eisleben|Halberstadt|Halle|Köthen|Merseburg|Naumburg|Quedlinburg|Stendal|Wernigerode',
                '|Wittenberg|B&#xFC;sum|Eutin|Flensburg|Gl&#xFC;ckstadt|Kiel|L&#xFC;beck|Rendsburg|Schleswig|Thuringia|Arnstadt|Eisenach|Erfurt|Gera',
                '|Gotha|Jena|Meiningen|M&#xFC;hlhausen|Nordhausen|Suhl|Weimar'
            ].join(), 'i'),
            //Italian
            new RegExp([
                'Abruzzi|Atri|Avezzano|Chieti|Lanciano|L’Aquila|Ortona|Pescara|Sulmona|Teramo|Vasto',
                '|Basilicata|Matera|Melfi|Potenza|Venosa|Calabria|Catanzaro|Cosenza|Crotone',
                '|Reggio di Calabria|Vibo Valentia|Advertisement|Campania|Amalfi|Ariano Irpino',
                '|Avellino|Aversa|Benevento|Capua|Caserta|Castellammare di Stabia|Cava de’ Tirreni',
                '|Eboli|Ercolano|Forio|Naples|Nocera Inferiore|Nola|Pomigliano d’Arco|Portici|Pozzuoli',
                '|Salerno|Sarno|Sessa Aurunca|Sorrento|Torre Annunziata|Torre del Greco|Advertisement',
                '|Emilia-Romagna|Argenta|Bobbio|Bologna|Carpi|Cento|Cesena|Faenza|Ferrara|Fidenza',
                '|Forlì|Guastalla|Imola|Lugo|Mirandola|Modena|Piacenza|Ravenna|Reggio nell’Emilia',
                '|Rimini|Friuli–Venezia Giulia|Aquileia|Cividale del Friuli|Gorizia|Monfalcone',
                '|Trieste|Udine|Lazio|Alatri|Anagni|Anzio|Aquino|Ardea|Arpino|Bolsena|Cassino',
                '|Castel Gandolfo|Civita Castellana|Civitavecchia|Cori|Ferentino|Fondi|Formia|Frascati',
                '|Frosinone|Gaeta|Latina|Marino|Rieti|Rome|Sora|Subiaco|Tarquinia|Terracina|Tivoli',
                '|Tuscania|Viterbo|Liguria|Bordighera|Chiavari|Genoa|Imperia|La Spezia|Portofino',
                '|Rapallo|San Remo|Sarzana|Savona|Ventimiglia|Lombardy|Belgioioso|Bergamo|Brescia',
                '|Busto Arsizio|Cantù|Como|Crema|Cremona|Desio|Gorgonzola|Lecco|Legnano|Lodi',
                '|Magenta|Mantua|Milan|Monza|Pavia|Sesto San Giovanni|Sondrio|Varese|Vigevano',
                '|Voghera|Marche|Ancona|Ascoli Piceno|Civitanova Marche|Fabriano|Fano|Fermo|Jesi',
                '|Loreto|Macerata|Pesaro|Senigallia|Urbino|Molise|Campobasso|Isernia|Piedmont',
                '|Alba|Alessandria|Asti|Biella|Casale Monferrato|Cuneo|Fossano|Ivrea|Moncalieri',
                '|Mondovì|Novara|Novi Ligure|Pinerolo|Rivoli|Saluzzo|Stresa|Tortona|Turin|Varallo',
                '|Verbania|Vercelli|Puglia|Altamura|Andria|Bari|Barletta|Bisceglie|Bitonto|Brindisi',
                '|Canosa di Puglia|Ceglie Messapico|Cerignola|Corato|Foggia|Gioia del Colle',
                '|Gravina in Puglia|Grottaglie|Lecce|Manduria|Manfredonia|Martina Franca|Mola di Bari',
                '|Molfetta|Monte Sant’Angelo|Nardò|Otranto|Ruvo di Puglia|San Giovanni Rotondo',
                '|San Severo|Taranto|Trani|Sardinia|Alghero|Cagliari|Carloforte|Iglesias|Nuoro|Olbia',
                '|Oristano|Porto Torres|Sassari|Sicily|Acireale|Adrano|Agrigento|Alcamo|Augusta',
                '|Avola|Bagheria|Bronte|Caltanissetta|Castelvetrano|Catania|Cefalù|Centuripe|Comiso',
                '|Corleone|Enna|Erice|Favara|Gela|Licata|Marsala|Mazara del Vallo|Messina|Milazzo',
                '|Modica|Monreale|Noto|Palazzolo Acreide|Palermo|Paternò|Piazza Armerina|Ragusa',
                '|Sciacca|Scicli|Syracuse|Taormina|Termini Imerese|Trapani|Vittoria|Trentino–Alto Adige/Südtirol',
                '|Bolzano|Bressanone|Merano|Rovereto|Trento|Tuscany|Arezzo|Capannori|Carrara|Cascina',
                '|Chianciano Terme|Cortona|Empoli|Fiesole|Florence|Grosseto|Livorno|Lucca|Massa',
                '|Montecatini Terme|Pescia|Pietrasanta|Piombino|Pisa|Pistoia|Prato|San Gimignano',
                '|San Giuliano Terme|Siena|Vallombrosa|Viareggio|Volterra|Umbria|Assisi',
                '|Città di Castello|Foligno|Gubbio|Narni|Orvieto|Perugia|Spoleto|Terni|Todi|Valle D’Aosta',
                '|Aosta|Veneto|Adria|Bassano del Grappa|Belluno|Burano|Castelfranco Veneto|Chioggia|Conegliano',
                '|Cortina d’Ampezzo|Este|Feltre|Mestre|Montagnana|Padua|Peschiera del Garda|Portogruaro|Rovigo',
                '|Schio|Torcello|Treviso|Venice|Verona|Vicenza|Vittorio Veneto'
            ].join(), 'i')
        ];

        this.streetRegex = [
            //Dutch
            new RegExp([
                'straat|weg|hout|laan|rijbaan|berg', 
                '|oprit|terras|plaats|hof|plein|Netherlands'].join('')
            , 'i'),
            //English
            new RegExp([
                'avenue|broadway|circus|court',
                '|crescent|cross|drive|gardens?|green|grove',
                '|junction|lane|place|plaza|park|ridge',
                '|road|saint|square|street|terrace|valley|way|United Kingdom'].join('')
            , 'i'),
            //French
            new RegExp([
                'route|avenue|manière|rue|boulevard',
                '|ruelle|all&#xE9;e|terrasse|place|cour|place|France'].join('')
            , 'i'),
            //German
            new RegExp([
                'stra&#xDF;e|weg|strae|allee|boulevard',
                '|weg|laufwerk|terrasse|platz|Germany'].join('')
            , 'i'),
            //Italian
            new RegExp([
                'strada|via|viale|viale|corsia',
                'in auto|terrazza|luogo|corte|piazza'].join('')
            , 'i'),
            /*
            //Polish
            new RegExp([
                'Droga|droga|ulica|aleja|bulwar|pas ruchu', 
                'napęd|taras|miejsce|sąd|plac'].join('')
            , 'i'),
            //Portuguese
            new RegExp([
                'estrada|caminho|rua|avenida|avenida|faixa', 
                'dirigir|terraço|lugar|tribunal|praça'].join('')
            , 'i'),
            //Russian
            new RegExp([
                'дорога|путь|улица|проспект|бульвар|переулок', 
                'проезд|терраса|место|корт|площадь'].join('')
            , 'i'),
            //Spanish
            new RegExp([
                'Calle|Carrer de|Rúa|Kale',
                'Avenida|Avinguda|Avenida|Avenue',
                'Plaza|Plaça|Praza|Plaza',
                'Paseo|Passeig|Paseo|Paseo'].join('')
            , 'i'),
            */
        ];
        this.instance = knowParser;
    }

    /**
     * Gathers addresses from a string.
     * 
     * @returns {Array} All the addresses found
     * @memberof KnowAddress
     */
    main(lines) {
        const lineInitial = lines;
        let lineChanger = lineInitial.join();
        lineChanger = lineChanger
            .replace(/\<\/?br?\>/g, ', ')
            .replace(/\<[/]?p[^>]*\>/g, ', ');
        lineChanger = lineChanger
            .replace(/\<[/]?span[^>]*\>/g, '')
            .replace(/(,\s*)+/g, ', ')
            .replace(/(\t)+/g, '');
        lineChanger = lineChanger
            .replace(/\<[^>]*\>/g, '\n');
        lineChanger = lineChanger
            .replace(/,+/g, ',')
            .replace(/[tel[.:]]/g, '\n');
        let lineListEmptyArrs = lineChanger.split('\n');
        const lineList = lineListEmptyArrs.filter(function(el) {
            if(el !== '' && el !== ',' && el !== ', ') {
                return true;
            }
        });
        let addressesFound = [];

        for(let i = 0; i < lineList.length; i++) {
            let line = lineList[i];
            let counter = 0;

            //Find if line contains street, then a city
            while(counter < this.streetRegex.length) {
                let streetFound = this.validateStreet(line, counter);
                if(streetFound !== -1  && line.length < 180) {
                    if(this.validateCity(line, streetFound)) {
                        let output = this.formatOutput(line);
                        addressesFound.push(output);
                        break;
                    }
                }
                if(streetFound == -1) {
                    break;
                }
                counter = streetFound + 1;
            }
        }

        return [...new Set(addressesFound)];
    }

    /**
     * Run cityRegex on a line, returning true/false
     * 
     * @param {String} line A line to run regex on
     * @param {Int} number Position of country in cityRegex to run
     * @return {Boolean} Returns true if line contains a city
     */
    validateCity(line, number) {
        let validAddress = false;
        let currentRegex = this.cityRegex[number];
        if (currentRegex.test(line)) {
            validAddress = true;
        }

        return validAddress;
    }

    /**
     * Run streetRegex on a line, returning position of matching country
     *
     * @param {String}  line  A line to run regex on
     * @param {Integer} number Position in StreetRegex to start regex on
     * @returns {Integer} Returns -1 if no match, >= 0 otherwise
     * @memberof KnowAddress
     */
    validateStreet(line, number) {
        let validAddress = -1;
        let counter = number;
        for (let x = number; x < this.streetRegex.length; x++) {
            let currentRegex = this.streetRegex[x];
            if (currentRegex.test(line)) {
                validAddress = counter;
                break;
            }
            counter++;
        }
        if(counter == this.streetRegex.length - 1) {
            return counter;
        }

        return validAddress;
    }

    /**
     * Puts the output line into a nicer format
     * @param {String} line to be formatted
     * @return {String} formatted line
     * @memberof knowAddress 
     */
    formatOutput(line) {
        return line
            .replace(/^,\s/, '')
            .replace(/,\s$/, '')
            .replace(/&amp;/, '&')
            .replace(/&apos;/, '\'')
            .replace(/&#xDF;/, 'ß')
            .replace(/&#xFC;/, 'ü')
            .replace(/&#xE9;/, 'é');
    }
}

module.exports = KnowAddress;
