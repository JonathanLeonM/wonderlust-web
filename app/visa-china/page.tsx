"use client";

import { useState } from "react";

const SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyyjjr2jBzJygb-i2_l_D6WtsdwX0T2ThOhIJCCAMeRvXwZrwtzFox5e02iHrqikV9OvQ/exec";

const COLOMBIA_GEO: Record<string, string[]> = {
  "Amazonas": ["Leticia", "Puerto Nariño"],
  "Antioquia": ["Abejorral", "Abriaquí", "Alejandría", "Amagá", "Amalfi", "Andes", "Angelópolis", "Angostura", "Anorí", "Anzá", "Apartadó", "Arboletes", "Argelia", "Armenia", "Barbosa", "Bello", "Belmira", "Betania", "Betulia", "Briceño", "Buriticá", "Cáceres", "Caicedo", "Caldas", "Campamento", "Cañasgordas", "Caracolí", "Caramanta", "Carepa", "Carolina del Príncipe", "Caucasia", "Chigorodó", "Cisneros", "Ciudad Bolívar", "Cocorná", "Concepción", "Concordia", "Copacabana", "Dabeiba", "Donmatías", "Ebéjico", "El Bagre", "El Carmen de Viboral", "El Peñol", "El Retiro", "El Santuario", "Entrerríos", "Envigado", "Fredonia", "Frontino", "Giraldo", "Girardota", "Gómez Plata", "Granada", "Guadalupe", "Guarne", "Guatapé", "Heliconia", "Hispania", "Itagüí", "Ituango", "Jardín", "Jericó", "La Ceja", "La Estrella", "La Pintada", "La Unión", "Liborina", "Maceo", "Marinilla", "Medellín", "Montebello", "Murindó", "Mutatá", "Nariño", "Nechí", "Necoclí", "Olaya", "Peque", "Pueblorrico", "Puerto Berrío", "Puerto Nare", "Puerto Triunfo", "Remedios", "Rionegro", "Sabanalarga", "Sabaneta", "Salgar", "San Andrés de Cuerquia", "San Carlos", "San Francisco", "San Jerónimo", "San José de la Montaña", "San Juan de Urabá", "San Luis", "San Pedro de Urabá", "San Pedro de los Milagros", "San Rafael", "San Roque", "San Vicente", "Santa Bárbara", "Santa Fe de Antioquia", "Santa Rosa de Osos", "Santo Domingo", "Segovia", "Sonsón", "Sopetrán", "Támesis", "Tarazá", "Tarso", "Titiribí", "Toledo", "Turbo", "Uramita", "Urrao", "Valdivia", "Valparaíso", "Vegachí", "Venecia", "Vigía del Fuerte", "Yalí", "Yarumal", "Yolombó", "Yondó", "Zaragoza"],
  "Arauca": ["Arauca", "Arauquita", "Cravo Norte", "Fortul", "Puerto Rondón", "Saravena", "Tame"],
  "Atlántico": ["Baranoa", "Barranquilla", "Campo de la Cruz", "Candelaria", "Galapa", "Juan de Acosta", "Luruaco", "Malambo", "Manatí", "Palmar de Varela", "Piojó", "Polonuevo", "Ponedera", "Puerto Colombia", "Repelón", "Sabanagrande", "Sabanalarga", "Santa Lucía", "Santo Tomás", "Soledad", "Suán", "Tubará", "Usiacurí"],
  "Bolívar": ["Achí", "Altos del Rosario", "Arenal", "Arjona", "Arroyohondo", "Barranco de Loba", "Brazuelo de Papayal", "Calamar", "Cantagallo", "Cartagena de Indias", "Cicuco", "Clemencia", "Córdoba", "El Carmen de Bolívar", "El Guamo", "El Peñón", "Hatillo de Loba", "Magangué", "Mahates", "Margarita", "María la Baja", "Mompós", "Montecristo", "Morales", "Norosí", "Pinillos", "Regidor", "Río Viejo", "San Cristóbal", "San Estanislao", "San Fernando", "San Jacinto del Cauca", "San Jacinto", "San Juan Nepomuceno", "San Martín de Loba", "San Pablo", "Santa Catalina", "Santa Rosa", "Santa Rosa del Sur", "Simití", "Soplaviento", "Talaigua Nuevo", "Tiquisio", "Turbaco", "Turbaná", "Villanueva", "Zambrano"],
  "Boyacá": ["Almeida", "Aquitania", "Arcabuco", "Belén", "Berbeo", "Betéitiva", "Boavita", "Boyacá", "Briceño", "Buenavista", "Busbanzá", "Caldas", "Campohermoso", "Cerinza", "Chinavita", "Chiquinquirá", "Chíquiza", "Chiscas", "Chita", "Chitaraque", "Chivatá", "Chivor", "Ciénega", "Cómbita", "Coper", "Corrales", "Covarachía", "Cubará", "Cucaita", "Cuítiva", "Duitama", "El Cocuy", "El Espino", "Firavitoba", "Floresta", "Gachantivá", "Gámeza", "Garagoa", "Guacamayas", "Guateque", "Guayatá", "Güicán", "Iza", "Jenesano", "Jericó", "La Capilla", "La Uvita", "La Victoria", "Labranzagrande", "Macanal", "Maripí", "Miraflores", "Mongua", "Monguí", "Moniquirá", "Motavita", "Muzo", "Nobsa", "Nuevo Colón", "Oicatá", "Otanche", "Pachavita", "Páez", "Paipa", "Pajarito", "Panqueba", "Pauna", "Paya", "Paz del Río", "Pesca", "Pisba", "Puerto Boyacá", "Quípama", "Ramiriquí", "Ráquira", "Rondón", "Saboyá", "Sáchica", "Samacá", "San Eduardo", "San José de Pare", "San Luis de Gaceno", "San Mateo", "San Miguel de Sema", "San Pablo de Borbur", "Santa María", "Santa Rosa de Viterbo", "Santa Sofía", "Santana", "Sativanorte", "Sativasur", "Siachoque", "Soatá", "Socha", "Socotá", "Sogamoso", "Somondoco", "Sora", "Soracá", "Sotaquirá", "Susacón", "Sutamarchán", "Sutatenza", "Tasco", "Tenza", "Tibaná", "Tibasosa", "Tinjacá", "Tipacoque", "Toca", "Togüí", "Tópaga", "Tota", "Tunja", "Tununguá", "Turmequé", "Tuta", "Tutazá", "Úmbita", "Ventaquemada", "Villa de Leyva", "Viracachá", "Zetaquira"],
  "Caldas": ["Aguadas", "Anserma", "Aranzazu", "Belalcázar", "Chinchiná", "Filadelfia", "La Dorada", "La Merced", "Manizales", "Manzanares", "Marmato", "Marquetalia", "Marulanda", "Neira", "Norcasia", "Pácora", "Palestina", "Pensilvania", "Riosucio", "Risaralda", "Salamina", "Samaná", "San José", "Supía", "Victoria", "Villamaría", "Viterbo"],
  "Caquetá": ["Albania", "Belén de los Andaquíes", "Cartagena del Chairá", "Curillo", "El Doncello", "El Paujil", "Florencia", "La Montañita", "Milán", "Morelia", "Puerto Rico", "San José del Fragua", "San Vicente del Caguán", "Solano", "Solita", "Valparaíso"],
  "Casanare": ["Aguazul", "Chámeza", "Hato Corozal", "La Salina", "Maní", "Monterrey", "Nunchía", "Orocué", "Paz de Ariporo", "Pore", "Recetor", "Sabanalarga", "Sácama", "San Luis de Palenque", "Támara", "Tauramena", "Trinidad", "Villanueva", "Yopal"],
  "Cauca": ["Almaguer", "Argelia", "Balboa", "Bolívar", "Buenos Aires", "Cajibío", "Caldono", "Caloto", "Corinto", "El Tambo", "Florencia", "Guachené", "Guapí", "Inzá", "Jambaló", "La Sierra", "La Vega", "López de Micay", "Mercaderes", "Miranda", "Morales", "Padilla", "Páez", "Patía", "Piamonte", "Piendamó", "Popayán", "Puerto Tejada", "Puracé", "Rosas", "San Sebastián", "Santa Rosa", "Santander de Quilichao", "Silvia", "Sotará", "Suárez", "Sucre", "Timbío", "Timbiquí", "Toribío", "Totoró", "Villa Rica"],
  "Cesar": ["Aguachica", "Agustín Codazzi", "Astrea", "Becerril", "Bosconia", "Chimichagua", "Chiriguaná", "Curumaní", "El Copey", "El Paso", "Gamarra", "González", "La Gloria", "La Jagua de Ibirico", "La Paz", "Manaure Balcón del Cesar", "Pailitas", "Pelaya", "Pueblo Bello", "Río de Oro", "San Alberto", "San Diego", "San Martín", "Tamalameque", "Valledupar"],
  "Chocó": ["Acandí", "Alto Baudó", "Bagadó", "Bahía Solano", "Bajo Baudó", "Bojayá", "Cantón de San Pablo", "Cértegui", "Condoto", "El Atrato", "El Carmen de Atrato", "El Carmen del Darién", "Istmina", "Juradó", "Litoral de San Juan", "Lloró", "Medio Atrato", "Medio Baudó", "Medio San Juan", "Nóvita", "Nuquí", "Quibdó", "Río Iró", "Río Quito", "Riosucio", "San José del Palmar", "Sipí", "Tadó", "Unión Panamericana", "Unguía"],
  "Cundinamarca": ["Agua de Dios", "Albán", "Anapoima", "Anolaima", "Apulo", "Arbeláez", "Beltrán", "Bituima", "Bojacá", "Cabrera", "Cachipay", "Cajicá", "Caparrapí", "Cáqueza", "Carmen de Carupa", "Chaguaní", "Chía", "Chipaque", "Choachí", "Chocontá", "Cogua", "Cota", "Cucunubá", "El Colegio", "El Peñón", "El Rosal", "Facatativá", "Fómeque", "Fosca", "Funza", "Fúquene", "Fusagasugá", "Gachalá", "Gachancipá", "Gachetá", "Gama", "Girardot", "Granada", "Guachetá", "Guaduas", "Guasca", "Guataquí", "Guatavita", "Guayabal de Síquima", "Guayabetal", "Gutiérrez", "Jerusalén", "Junín", "La Calera", "La Mesa", "La Palma", "La Peña", "La Vega", "Lenguazaque", "Machetá", "Madrid", "Manta", "Medina", "Mosquera", "Nariño", "Nemocón", "Nilo", "Nimaima", "Nocaima", "Pacho", "Paime", "Pandi", "Paratebueno", "Pasca", "Puerto Salgar", "Pulí", "Quebradanegra", "Quetame", "Quipile", "Ricaurte", "San Antonio del Tequendama", "San Bernardo", "San Cayetano", "San Francisco", "San Juan de Rioseco", "Sasaima", "Sesquilé", "Sibaté", "Silvania", "Simijaca", "Soacha", "Sopó", "Subachoque", "Suesca", "Supatá", "Susa", "Sutatausa", "Tabio", "Tausa", "Tena", "Tenjo", "Tibacuy", "Tibirita", "Tocaima", "Tocancipá", "Topaipí", "Ubalá", "Ubaque", "Ubaté", "Une", "Útica", "Venecia", "Vergara", "Vianí", "Villagómez", "Villapinzón", "Villeta", "Viotá", "Yacopí", "Zipacón", "Zipaquirá"],
  "Córdoba": ["Ayapel", "Buenavista", "Canalete", "Cereté", "Chimá", "Chinú", "Ciénaga de Oro", "Cotorra", "La Apartada", "Lorica", "Los Córdobas", "Momil", "Montelíbano", "Montería", "Moñitos", "Planeta Rica", "Pueblo Nuevo", "Puerto Escondido", "Puerto Libertador", "Purísima", "Sahagún", "San Andrés de Sotavento", "San Antero", "San Bernardo del Viento", "San Carlos", "San José de Uré", "San Pelayo", "Tierralta", "Tuchín", "Valencia"],
  "Guainía": ["Inírida"],
  "Guaviare": ["Calamar", "El Retorno", "Miraflores", "San José del Guaviare"],
  "Huila": ["Acevedo", "Agrado", "Aipe", "Algeciras", "Altamira", "Baraya", "Campoalegre", "Colombia", "El Pital", "Elías", "Garzón", "Gigante", "Guadalupe", "Hobo", "Íquira", "Isnos", "La Argentina", "La Plata", "Nátaga", "Neiva", "Oporapa", "Paicol", "Palermo", "Palestina", "Pitalito", "Rivera", "Saladoblanco", "San Agustín", "Santa María", "Suaza", "Tarqui", "Tello", "Teruel", "Tesalia", "Timaná", "Villavieja", "Yaguará"],
  "La Guajira": ["Albania", "Barrancas", "Dibulla", "Distracción", "El Molino", "Fonseca", "Hatonuevo", "La Jagua del Pilar", "Maicao", "Manaure", "Riohacha", "San Juan del Cesar", "Uribia", "Urumita", "Villanueva"],
  "Magdalena": ["Algarrobo", "Aracataca", "Ariguaní", "Cerro de San Antonio", "Chibolo", "Ciénaga", "Concordia", "El Banco", "El Piñón", "El Retén", "Fundación", "Guamal", "Nueva Granada", "Pedraza", "Pijiño del Carmen", "Pivijay", "Plato", "Pueblo Viejo", "Remolino", "Sabanas de San Ángel", "Salamina", "San Sebastián de Buenavista", "San Zenón", "Santa Ana", "Santa Bárbara de Pinto", "Santa Marta", "Sitionuevo", "Tenerife", "Zapayán", "Zona Bananera"],
  "Meta": ["Acacías", "Barranca de Upía", "Cabuyaro", "Castilla la Nueva", "Cubarral", "Cumaral", "El Calvario", "El Castillo", "El Dorado", "Fuente de Oro", "Granada", "Guamal", "La Macarena", "La Uribe", "Lejanías", "Mapiripán", "Mesetas", "Puerto Concordia", "Puerto Gaitán", "Puerto Lleras", "Puerto López", "Puerto Rico", "Restrepo", "San Carlos de Guaroa", "San Juan de Arama", "San Juanito", "San Martín", "Villavicencio", "Vista Hermosa"],
  "Nariño": ["Aldana", "Ancuyá", "Arboleda", "Barbacoas", "Belén", "Buesaco", "Chachagüí", "Colón", "Consacá", "Contadero", "Córdoba", "Cuaspud", "Cumbal", "Cumbitara", "El Charco", "El Peñol", "El Rosario", "El Tablón", "El Tambo", "Francisco Pizarro", "Funes", "Guachucal", "Guaitarilla", "Gualmatán", "Iles", "Imués", "Ipiales", "La Cruz", "La Florida", "La Llanada", "La Tola", "La Unión", "Leiva", "Linares", "Los Andes", "Magüí Payán", "Mallama", "Mosquera", "Nariño", "Olaya Herrera", "Ospina", "Pasto", "Policarpa", "Potosí", "Providencia", "Puerres", "Pupiales", "Ricaurte", "Roberto Payán", "Samaniego", "San Bernardo", "San José de Albán", "San Lorenzo", "San Pablo", "San Pedro de Cartago", "Sandoná", "Santa Bárbara", "Santacruz", "Sapuyes", "Taminango", "Tangua", "Tumaco", "Túquerres", "Yacuanquer"],
  "Norte de Santander": ["Ábrego", "Arboledas", "Bochalema", "Bucarasica", "Cáchira", "Cácota", "Chinácota", "Chitagá", "Convención", "Cúcuta", "Cucutilla", "Duranía", "El Carmen", "El Tarra", "El Zulia", "Gramalote", "Hacarí", "Herrán", "La Esperanza", "La Playa de Belén", "Labateca", "Los Patios", "Lourdes", "Mutiscua", "Ocaña", "Pamplona", "Pamplonita", "Puerto Santander", "Ragonvalia", "Salazar de Las Palmas", "San Calixto", "San Cayetano", "Santiago", "Santo Domingo de Silos", "Sardinata", "Teorama", "Tibú", "Toledo", "Villa Caro", "Villa del Rosario"],
  "Putumayo": ["Colón", "Mocoa", "Orito", "Puerto Asís", "Puerto Caicedo", "Puerto Guzmán", "Puerto Leguízamo", "San Francisco", "San Miguel", "Santiago", "Sibundoy", "Valle del Guamuez", "Villagarzón"],
  "Quindío": ["Armenia", "Buenavista", "Calarcá", "Circasia", "Córdoba", "Filandia", "Génova", "La Tebaida", "Montenegro", "Pijao", "Quimbaya", "Salento"],
  "Risaralda": ["Apía", "Balboa", "Belén de Umbría", "Dosquebradas", "Guática", "La Celia", "La Virginia", "Marsella", "Mistrató", "Pereira", "Pueblo Rico", "Quinchía", "Santa Rosa de Cabal", "Santuario"],
  "San Andrés y Providencia": ["Providencia y Santa Catalina Islas", "San Andrés"],
  "Santander": ["Aguada", "Albania", "Aratoca", "Barbosa", "Barichara", "Barrancabermeja", "Betulia", "Bolívar", "Bucaramanga", "Cabrera", "California", "Capitanejo", "Carcasí", "Cepitá", "Cerrito", "Charalá", "Charta", "Chima", "Chipatá", "Cimitarra", "Concepción", "Confines", "Contratación", "Coromoro", "Curití", "El Carmen de Chucurí", "El Guacamayo", "El Peñón", "El Playón", "El Socorro", "Encino", "Enciso", "Florián", "Floridablanca", "Galán", "Gámbita", "Girón", "Guaca", "Guadalupe", "Guapotá", "Guavatá", "Güepsa", "Hato", "Jesús María", "Jordán", "La Belleza", "La Paz", "Landázuri", "Lebrija", "Los Santos", "Macaravita", "Málaga", "Matanza", "Mogotes", "Molagavita", "Ocamonte", "Oiba", "Onzaga", "Palmar", "Palmas del Socorro", "Páramo", "Piedecuesta", "Pinchote", "Puente Nacional", "Puerto Parra", "Puerto Wilches", "Rionegro", "Sabana de Torres", "San Andrés", "San Benito", "San Gil", "San Joaquín", "San José de Miranda", "San Miguel", "San Vicente de Chucurí", "Santa Bárbara", "Santa Helena del Opón", "Simacota", "Suaita", "Sucre", "Suratá", "Tona", "Valle de San José", "Vélez", "Vetas", "Villanueva", "Zapatoca"],
  "Sucre": ["Buenavista", "Caimito", "Chalán", "Coloso", "Corozal", "Coveñas", "El Roble", "Galeras", "Guaranda", "La Unión", "Los Palmitos", "Majagual", "Morroa", "Ovejas", "Sampués", "San Antonio de Palmito", "San Benito Abad", "San Juan de Betulia", "San Marcos", "San Onofre", "San Pedro", "Sincé", "Sincelejo", "Sucre", "Tolú", "Tolú Viejo"],
  "Tolima": ["Alpujarra", "Alvarado", "Ambalema", "Anzoátegui", "Armero", "Ataco", "Cajamarca", "Carmen de Apicalá", "Casabianca", "Chaparral", "Coello", "Coyaima", "Cunday", "Dolores", "El Espinal", "Falán", "Flandes", "Fresno", "Guamo", "Herveo", "Honda", "Ibagué", "Icononzo", "Lérida", "Líbano", "Mariquita", "Melgar", "Murillo", "Natagaima", "Ortega", "Palocabildo", "Piedras", "Planadas", "Prado", "Purificación", "Rioblanco", "Roncesvalles", "Rovira", "Saldaña", "San Antonio", "San Luis", "Santa Isabel", "Suárez", "Valle de San Juan", "Venadillo", "Villahermosa", "Villarrica"],
  "Valle del Cauca": ["Alcalá", "Andalucía", "Ansermanuevo", "Argelia", "Bolívar", "Buenaventura", "Buga", "Bugalagrande", "Caicedonia", "Cali", "Calima", "Candelaria", "Cartago", "Dagua", "El Águila", "El Cairo", "El Cerrito", "El Dovio", "Florida", "Ginebra", "Guacarí", "Jamundí", "La Cumbre", "La Unión", "La Victoria", "Obando", "Palmira", "Pradera", "Restrepo", "Riofrío", "Roldanillo", "San Pedro", "Sevilla", "Toro", "Trujillo", "Tuluá", "Ulloa", "Versalles", "Vijes", "Yotoco", "Yumbo", "Zarzal"],
  "Vaupés": ["Carurú", "Mitú", "Taraira"],
  "Vichada": ["Cumaribo", "La Primavera", "Puerto Carreño", "Santa Rosalía"],
  "Bogotá D.C.": ["Bogotá"],
};
const EMAIL_DOMAINS = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com", "icloud.com"];
const COUNTRIES = ["Colombia", "México", "Perú", "Ecuador", "Venezuela", "Chile", "Argentina", "España", "Estados Unidos", "Otro"];
const WORLD_COUNTRIES = ['Afganistán','Albania','Alemania','Andorra','Angola','Antigua y Barbuda','Arabia Saudita','Argelia','Argentina','Armenia','Aruba','Australia','Austria','Azerbaiyán','Bahamas','Baréin','Bangladés','Barbados','Bélgica','Belice','Benín','Bielorrusia','Birmania (Myanmar)','Bolivia','Bosnia y Herzegovina','Botsuana','Brasil','Brunéi','Bulgaria','Burkina Faso','Burundi','Bután','Cabo Verde','Camboya','Camerún','Canadá','Catar','Chad','Chile','China','Chipre','Ciudad del Vaticano','Colombia','Comoras','Corea del Norte','Corea del Sur','Costa de Marfil','Costa Rica','Croacia','Cuba','Curazao','Dinamarca','Dominica','Ecuador','Egipto','El Salvador','Emiratos Árabes Unidos','Eritrea','Eslovaquia','Eslovenia','España','Estados Unidos','Estonia','Esuatini','Etiopía','Filipinas','Finlandia','Fiyi','Francia','Gabón','Gambia','Georgia','Ghana','Granada','Grecia','Groenlandia','Guatemala','Guyana','Guinea','Guinea-Bisáu','Guinea Ecuatorial','Haití','Honduras','Hong Kong','Hungría','India','Indonesia','Irak','Irán','Irlanda','Islandia','Islas Caimán','Islas Salomón','Israel','Italia','Jamaica','Japón','Jordania','Kazajistán','Kenia','Kirguistán','Kiribati','Kosovo','Kuwait','Laos','Lesoto','Letonia','Líbano','Liberia','Libia','Liechtenstein','Lituania','Luxemburgo','Macao','Macedonia del Norte','Madagascar','Malasia','Malaui','Maldivas','Malí','Malta','Marruecos','Marshall, Islas','Mauricio','Mauritania','México','Micronesia','Moldavia','Mónaco','Mongolia','Montenegro','Mozambique','Namibia','Nauru','Nepal','Nicaragua','Níger','Nigeria','Noruega','Nueva Zelanda','Omán','Países Bajos','Pakistán','Palaos','Palestina','Panamá','Papúa Nueva Guinea','Paraguay','Perú','Polonia','Portugal','Puerto Rico','Reino Unido','República Centroafricana','República Checa','República Democrática del Congo','República Dominicana','República del Congo','Ruanda','Rumanía','Rusia','Samoa','San Cristóbal y Nieves','San Marino','San Vicente y las Granadinas','Santa Lucía','Santo Tomé y Príncipe','Senegal','Serbia','Seychelles','Sierra Leona','Singapur','Siria','Somalia','Sri Lanka','Sudáfrica','Sudán','Sudán del Sur','Suecia','Suiza','Surinam','Tailandia','Taiwán','Tanzania','Tayikistán','Timor Oriental','Togo','Tonga','Trinidad y Tobago','Túnez','Turkmenistán','Turquía','Tuvalu','Ucrania','Uganda','Uruguay','Uzbekistán','Vanuatu','Venezuela','Vietnam','Yemen','Yibuti','Zambia','Zimbabue'];

type FieldDef = {
  step: number;
  type: "text" | "choice";
  key: string;
  label: string;
  shortLabel?: string;
  inputType?: string;
  numeric?: boolean;
  email?: boolean;
  textarea?: boolean;
  placeholder?: string;
  options?: string[];
  revealOn?: string;
  revealKey?: string;
  revealLabel?: string;
  revealCountries?: boolean;
  revealMonthYear?: boolean;
  revealMonthYearList?: boolean;
  default?: string;
  required: boolean;
};

const FIELDS: FieldDef[] = [
  { step: 0, type: "text", key: "email", label: "Correo electrónico", inputType: "email", email: true, required: true },
  { step: 0, type: "text", key: "nombres", label: "Nombres y apellidos completos", required: false },
  { step: 0, type: "text", key: "cedula", label: "Número de cédula", numeric: true, required: true },
  { step: 0, type: "text", key: "fechaNacimiento", label: "Fecha de nacimiento", inputType: "date", required: true },
  { step: 0, type: "choice", key: "estadoCivil", label: "Estado civil", options: ["Casado", "Soltero", "Viudo", "Separado", "Otro"], revealOn: "Otro", revealKey: "estadoCivilOtro", required: true },
  { step: 0, type: "text", key: "nacionalidad", label: "Nacionalidad", default: "Colombiano", required: true },
  { step: 0, type: "choice", key: "otraNacionalidad", label: "¿Tiene otra nacionalidad?", options: ["Sí", "No"], revealOn: "Sí", revealKey: "otraNacionalidadCual", revealLabel: "¿Cuál?", required: true },
  { step: 0, type: "choice", key: "educacion", label: "Nivel más alto de educación", options: ["Escuela secundaria", "Pregrado", "Posgrado", "Doctorado", "Otro"], revealOn: "Otro", revealKey: "educacionOtro", required: true },
  { step: 0, type: "text", key: "institucion", label: "Institución donde se graduó", required: true },

  { step: 1, type: "text", key: "direccion", label: "Dirección de residencia actual", required: true },
  { step: 1, type: "text", key: "telefono", label: "Número de teléfono", inputType: "tel", numeric: true, required: true },
  { step: 1, type: "text", key: "padreNombre", label: "Nombre y apellido del padre", shortLabel: "Nombre y apellido", required: true },
  { step: 1, type: "text", key: "padreNacionalidad", label: "Nacionalidad del padre", shortLabel: "Nacionalidad", placeholder: "Ej. Colombiana", required: true },
  { step: 1, type: "text", key: "padreFecha", label: "Fecha de nacimiento del padre", shortLabel: "Fecha de nacimiento", inputType: "date", required: true },
  { step: 1, type: "text", key: "madreNombre", label: "Nombre y apellido de la madre", shortLabel: "Nombre y apellido", required: true },
  { step: 1, type: "text", key: "madreNacionalidad", label: "Nacionalidad de la madre", shortLabel: "Nacionalidad", placeholder: "Ej. Colombiana", required: true },
  { step: 1, type: "text", key: "madreFecha", label: "Fecha de nacimiento de la madre", shortLabel: "Fecha de nacimiento", inputType: "date", required: true },

  { step: 2, type: "choice", key: "parientesChina", label: "¿Tiene parientes (aparte de sus padres) en China?", options: ["Sí", "No"], required: true },
  { step: 2, type: "text", key: "contactoNombre", label: "Nombre y apellido del contacto de emergencia", required: true },
  { step: 2, type: "text", key: "contactoParentesco", label: "Parentesco del contacto de emergencia", required: true },
  { step: 2, type: "text", key: "contactoTelefono", label: "Teléfono del contacto de emergencia", inputType: "tel", numeric: true, required: true },
  { step: 2, type: "text", key: "contactoCorreo", label: "Correo del contacto de emergencia", inputType: "email", email: true, required: true },
  { step: 2, type: "choice", key: "quienPaga", label: "¿Quién pagará el viaje?", options: ["Yo", "Empresa", "Otro"], revealOn: "Otro", revealKey: "quienPagaOtro", required: true },
  { step: 2, type: "choice", key: "haEstadoChina", label: "¿Alguna vez ha estado en China?", options: ["Sí", "No"], revealOn: "Sí", revealKey: "haEstadoChinaFechas", revealLabel: "¿En qué fechas?", revealMonthYearList: true, required: true },

  { step: 3, type: "choice", key: "otrasVisasVigentes", label: "¿Posee alguna visa válida emitida por otros países?", options: ["Sí", "No"], revealOn: "Sí", revealKey: "otrasVisasVigentesPaises", revealLabel: "Escribe un país y presiona Enter", revealCountries: true, required: true },
  { step: 3, type: "choice", key: "visaNegada", label: "¿Alguna vez le han negado la visa a China?", options: ["Sí", "No"], required: true },
  { step: 3, type: "choice", key: "ingresoIlegal", label: "¿Ha ingresado a China ilegalmente, o permanecido/trabajado sin permiso?", options: ["Sí", "No"], required: true },
  { step: 3, type: "choice", key: "antecedentesPenales", label: "¿Tiene antecedentes penales en China o en otro país?", options: ["Sí", "No"], required: true },
  { step: 3, type: "choice", key: "epidemias", label: "¿Ha visitado zonas con alguna epidemia en los últimos 30 días?", options: ["Sí", "No"], required: true },
  { step: 3, type: "choice", key: "formacionArmas", label: "¿Tiene formación en armas, explosivos o productos biológicos/químicos?", options: ["Sí", "No"], required: true },
  { step: 3, type: "choice", key: "servicioMilitar", label: "¿Está sirviendo o ha servido en el ejército?", options: ["Sí", "No"], required: true },
  { step: 3, type: "choice", key: "paramilitar", label: "¿Ha participado en organizaciones paramilitares o fuerzas armadas irregulares?", options: ["Sí", "No"], required: true },
  { step: 3, type: "choice", key: "organizacionBenefica", label: "¿Trabaja para alguna organización profesional, social o benéfica?", options: ["Sí", "No"], required: true },
  { step: 3, type: "text", key: "declaracionAdicional", label: "¿Hay algo más que quieras declarar?", textarea: true, required: true },

  { step: 4, type: "choice", key: "ocupacion", label: "Ocupación", options: ["Empresario", "Jubilado", "Empleado de empresa", "Artista", "Estudiante", "Personal militar", "Trabajador por cuenta propia", "Otro", "HGW"], revealOn: "Otro", revealKey: "ocupacionOtro", required: true },
  { step: 4, type: "choice", key: "visaChinaAprobada", label: "¿Le han aprobado alguna vez la visa a China?", options: ["Sí", "No"], revealOn: "Sí", revealKey: "lugarEmisionVisa", revealLabel: "Lugar de emisión", required: true },
  { step: 4, type: "choice", key: "tieneHijos", label: "¿Tiene hijos?", options: ["Sí", "No"], required: true },
];

const STEP_LABELS = ["Datos", "Familia", "Emergencia", "Antecedentes", "Ocupación", "Revisión"];

type Hijo = { nombre: string; fecha: string; nacionalidad: string };
type Experiencia = { empresa: string; cargo: string; mesInicio: string; anioInicio: string; mesFin: string; anioFin: string; actual: boolean; direccion: string; telefono: string; supervisor: string };
type FormData = Record<string, any>;
const MONTHS = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
function currentMonthYear() { const d = new Date(); return { mes: MONTHS[d.getMonth()], anio: String(d.getFullYear()) }; }
function yearsList() { const y = new Date().getFullYear(); const out: string[] = []; for (let i = y; i >= y - 60; i--) out.push(String(i)); return out; }
const HGW_DEFAULTS = { empresa: 'HGW', cargo: 'Distribuidor Independiente', mesInicio: 'ENE', anioInicio: '2020', actual: true, direccion: 'CL 119 #14-42', telefono: '(+57) 777 77 77', supervisor: 'Nohora Santos Vigoya' };
const emptyExperiencia = (): Experiencia => ({ empresa: '', cargo: '', mesInicio: '', anioInicio: '', mesFin: '', anioFin: '', actual: false, direccion: '', telefono: '', supervisor: '' });

function defaultData(): FormData {
  const d: FormData = {};
  FIELDS.forEach((f) => {
    if (f.type === "choice" && f.options?.includes("No")) d[f.key] = "No";
    if (f.default) d[f.key] = f.default;
  });
  d.paisNacimiento = "Colombia";
  d.paisResidencia = "Colombia";
  return d;
}

function emailSuggestions(value: string): string[] {
  if (!value) return [];
  const at = value.indexOf("@");
  if (at === -1) return EMAIL_DOMAINS.map((d) => value + "@" + d);
  const local = value.slice(0, at);
  const partial = value.slice(at + 1);
  if (!local) return [];
  return EMAIL_DOMAINS.filter((d) => d.startsWith(partial)).map((d) => local + "@" + d);
}

const colors = { bg: "#f7f0e4", card: "#fdf9f0", ink: "#3a2c22", muted: "#7c6a58", faint: "#9a8a76", teal: "#14514f", terracotta: "#bd5a34", cream: "#fdf7ec" };

const inputStyle = (invalid: boolean): React.CSSProperties => ({ padding: "11px 13px", borderRadius: 10, border: invalid ? "1.5px solid #bd5a34" : "1px solid rgba(58,44,34,.18)", background: "#fff", fontSize: 14, height: 42, width: "100%", fontFamily: "inherit" });
const labelStyle = (invalid: boolean): React.CSSProperties => ({ fontSize: 12.5, fontWeight: 700, color: invalid ? colors.terracotta : colors.ink, marginBottom: 6, display: "block" });

export default function VisaChinaForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(defaultData);
  const [showError, setShowError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [revealBuffers, setRevealBuffers] = useState<Record<string, string>>({});
  const [paisVisitadoInput, setPaisVisitadoInput] = useState("");
  const [activeSuggestField, setActiveSuggestField] = useState<string | null>(null);
  const setField = (key: string, val: any) => {
    setData((d) => {
      const next = { ...d, [key]: val };
      if (key === 'ocupacion' && (val === 'Empleado de empresa' || val === 'HGW') && !(d.experienciasList || []).length) next.experienciasList = [val === 'HGW' ? { ...HGW_DEFAULTS } : emptyExperiencia()];
      if (key === 'haEstadoChina' && val === 'Sí' && !(d.haEstadoChinaFechas || []).length) next.haEstadoChinaFechas = [{ mes: '', anio: '' }];
      return next;
    });
    setShowError(false);
  };
  const addRevealDate = (revealKey: string) => setData((d) => {
    const list = d[revealKey] || [];
    if (list.length >= 6) return d;
    return { ...d, [revealKey]: [...list, { mes: '', anio: '' }] };
  });
  const removeRevealDate = (revealKey: string, idx: number) => setData((d) => ({ ...d, [revealKey]: (d[revealKey] || []).filter((_: any, i: number) => i !== idx) }));
  const updateRevealDate = (revealKey: string, idx: number, key: string, val: string) => {
    setData((d) => ({ ...d, [revealKey]: (d[revealKey] || []).map((v: any, i: number) => i === idx ? { ...v, [key]: val } : v) }));
    setShowError(false);
  };
  const addExperiencia = () => setData((d) => {
    const list: Experiencia[] = d.experienciasList || [];
    if (list.length >= 5) return d;
    return { ...d, experienciasList: [...list, emptyExperiencia()] };
  });
  const removeExperiencia = (idx: number) => setData((d) => ({ ...d, experienciasList: (d.experienciasList || []).filter((_: Experiencia, i: number) => i !== idx) }));
  const updateExperienciaField = (idx: number, key: keyof Experiencia, val: any) => {
    setData((d) => ({ ...d, experienciasList: (d.experienciasList || []).map((e: Experiencia, i: number) => i === idx ? { ...e, [key]: val } : e) }));
    setShowError(false);
  };
  const toggleExperienciaActual = (idx: number) => setData((d) => {
    const cur = currentMonthYear();
    const list = (d.experienciasList || []).map((e: Experiencia, i: number) => {
      if (i !== idx) return e;
      const actual = !e.actual;
      return { ...e, actual, mesFin: actual ? cur.mes : e.mesFin, anioFin: actual ? cur.anio : e.anioFin };
    });
    return { ...d, experienciasList: list };
  });
  const autofillExperienciaHGW = (idx: number) => setData((d) => ({ ...d, experienciasList: (d.experienciasList || []).map((e: Experiencia, i: number) => i === idx ? { ...e, ...HGW_DEFAULTS } : e) }));

  const isFieldInvalid = (f: FieldDef) => {
    if (!f.required) return false;
    const empty = !data[f.key] || !String(data[f.key]).trim();
    if (empty) return true;
    if (f.revealOn && data[f.key] === f.revealOn) {
      if (f.revealMonthYearList) { const list = data[f.revealKey!] || []; return !list.length || list.some((v: any) => !v.mes || !v.anio); }
      if (f.revealMonthYear) return !data[f.revealKey+'Mes'] || !data[f.revealKey+'Anio'];
      if (f.revealCountries) return !data[f.revealKey!] || !data[f.revealKey!].length;
      return !data[f.revealKey!] || !String(data[f.revealKey!]).trim();
    }
    return false;
  };

  const isStepValid = (stepIndex: number) => {
    const stepFields = FIELDS.filter((f) => f.step === stepIndex);
    if (stepFields.some((f) => isFieldInvalid(f))) return false;
    if (stepIndex === 0 && (!data.paisNacimiento || !data.departamentoNacimiento || !data.ciudadNacimiento)) return false;
    if (stepIndex === 1 && (!data.paisResidencia || !data.departamentoResidencia || !data.ciudadResidencia)) return false;
    if (stepIndex === 4) {
      if (!data.paisesVisitadosList || !data.paisesVisitadosList.length) return false;
      if (data.ocupacion === "Empleado de empresa" || data.ocupacion === "HGW") {
        const list: Experiencia[] = data.experienciasList || [];
        if (!list.length) return false;
        if (list.some((e) => !e.empresa || !e.cargo || !e.mesInicio || !e.anioInicio || (!e.actual && (!e.mesFin || !e.anioFin)) || !e.direccion || !e.telefono || !e.supervisor)) return false;
      }
      if (data.tieneHijos === "Sí") {
        const list: Hijo[] = data.hijosList || [];
        if (!list.length) return false;
        if (list.some((h) => !h.nombre || !h.nombre.trim() || !h.fecha)) return false;
      }
    }
    return true;
  };

  const goNext = () => { if (!isStepValid(step)) { setShowError(true); return; } setStep((s) => Math.min(5, s + 1)); setShowError(false); window.scrollTo(0, 0); };
  const goBack = () => { setStep((s) => Math.max(0, s - 1)); setShowError(false); window.scrollTo(0, 0); };

  const addChip = (revealKey: string, val: string) => {
    const v = val.trim();
    if (!v) return;
    const list: string[] = data[revealKey] || [];
    if (!list.includes(v)) setField(revealKey, [...list, v]);
    setRevealBuffers((b) => ({ ...b, [revealKey]: "" }));
  };
  const removeChip = (revealKey: string, val: string) => setField(revealKey, (data[revealKey] || []).filter((x: string) => x !== val));

  const addHijo = () => setData((d) => {
    const list: Hijo[] = d.hijosList || [];
    if (list.length >= 6) return d;
    return { ...d, hijosList: [...list, { nombre: "", fecha: "", nacionalidad: "" }] };
  });
  const removeHijo = (idx: number) => setData((d) => ({ ...d, hijosList: (d.hijosList || []).filter((_: Hijo, i: number) => i !== idx) }));
  const updateHijoField = (idx: number, key: keyof Hijo, val: string) => {
    setData((d) => ({ ...d, hijosList: (d.hijosList || []).map((h: Hijo, i: number) => i === idx ? { ...h, [key]: val } : h) }));
    setShowError(false);
  };

  const buildOrderedPayload = () => {
    // Fixed key order + readable Spanish titles, so every row lands in the same
    // columns regardless of the order the user filled fields in.
    const out: Record<string, any> = {};
    out['Fecha de envío'] = new Date().toISOString();
    FIELDS.forEach((f: any) => {
      const val = data[f.key] || '';
      out[f.label] = val;
      if (f.revealKey) {
        const revLabel = f.label + ' — ' + (f.revealLabel || 'detalle');
        const active = f.revealOn && val === f.revealOn;
        out[revLabel] = !active ? '' : f.revealMonthYearList ? (data[f.revealKey] || []).map((v: any) => v.mes + ' ' + v.anio).join(', ') : f.revealMonthYear ? [data[f.revealKey+'Mes'], data[f.revealKey+'Anio']].filter(Boolean).join(' ') : f.revealCountries ? (data[f.revealKey] || []).join(', ') : (data[f.revealKey] || '');
      }
      if (f.key === 'direccion') {
        out['País de residencia'] = data.paisResidencia || '';
        out['Departamento / Estado de residencia'] = data.departamentoResidencia || '';
        out['Ciudad de residencia'] = data.ciudadResidencia || '';
      }
      if (f.key === 'fechaNacimiento') {
        out['País de nacimiento'] = data.paisNacimiento || '';
        out['Departamento / Estado de nacimiento'] = data.departamentoNacimiento || '';
        out['Ciudad de nacimiento'] = data.ciudadNacimiento || '';
      }
    });
    out['Países visitados en los últimos 2 años'] = (data.paisesVisitadosList || []).join(', ');
    const experienciasList: Experiencia[] = data.experienciasList || [];
    for (let i = 0; i < 5; i++) {
      const e = experienciasList[i];
      const n = i + 1;
      const fechas = e ? (e.actual ? (e.mesInicio + ' ' + e.anioInicio + ' – Actualmente') : (e.mesInicio + ' ' + e.anioInicio + ' – ' + e.mesFin + ' ' + e.anioFin)) : '';
      out['Experiencia ' + n + ' — Empresa'] = e ? (e.empresa || '') : '';
      out['Experiencia ' + n + ' — Cargo'] = e ? (e.cargo || '') : '';
      out['Experiencia ' + n + ' — Fechas'] = fechas.trim();
      out['Experiencia ' + n + ' — Dirección'] = e ? (e.direccion || '') : '';
      out['Experiencia ' + n + ' — Teléfono'] = e ? (e.telefono || '') : '';
      out['Experiencia ' + n + ' — Supervisor'] = e ? (e.supervisor || '') : '';
    }
    const hijosList = data.hijosList || [];
    for (let i = 0; i < 6; i++) {
      const h = hijosList[i];
      const n = i + 1;
      out['Hijo ' + n + ' — Nombre'] = h ? (h.nombre || '') : '';
      out['Hijo ' + n + ' — Nacionalidad'] = h ? (h.nacionalidad || '') : '';
      out['Hijo ' + n + ' — Fecha de nacimiento'] = h ? (h.fecha || '') : '';
    }
    return out;
  };

  const submitForm = () => {
    setSubmitting(true);
    const payload = buildOrderedPayload();
    const done = () => { setSubmitting(false); setSubmitted(true); };
    // XMLHttpRequest (not fetch): Apps Script /exec responds with a 302 redirect, and
    // fetch's no-cors mode silently follows it by converting the POST into a GET, which
    // drops the body — so the sheet never receives the data. XHR preserves the POST through it.
    try {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", SHEETS_WEBHOOK_URL, true);
      xhr.setRequestHeader("Content-Type", "text/plain;charset=utf-8");
      xhr.onload = done;
      xhr.onerror = done;
      xhr.send(JSON.stringify(payload));
    } catch (e) { done(); }
  };

  const renderField = (f: FieldDef) => {
    const invalid = showError && isFieldInvalid(f);
    const isChoice = f.type === "choice";
    const span = f.textarea || isChoice ? "1 / -1" : "auto";
    const suggestions = f.email ? emailSuggestions(data[f.key] || "") : [];
    const showSuggest = f.email && activeSuggestField === f.key && suggestions.length > 0;
    return (
      <div key={f.key} style={{ gridColumn: span, display: "flex", flexDirection: "column", gap: 6 }}>
        <label style={labelStyle(invalid)}>{f.shortLabel || f.label}{f.required ? " *" : ""}</label>
        {!isChoice && f.textarea && (
          <textarea value={data[f.key] || ""} onChange={(e) => setField(f.key, e.target.value)} placeholder={f.placeholder || ""} rows={3} style={{ ...inputStyle(invalid), height: "auto", resize: "vertical" }} />
        )}
        {!isChoice && !f.textarea && (
          <div style={{ position: "relative" }}>
            <input
              type={f.inputType || "text"}
              inputMode={f.numeric ? "numeric" : undefined}
              value={data[f.key] || ""}
              onChange={(e) => setField(f.key, f.numeric ? e.target.value.replace(/\D/g, "") : e.target.value)}
              onFocus={() => f.email && setActiveSuggestField(f.key)}
              onBlur={() => f.email && setTimeout(() => setActiveSuggestField((cur) => cur === f.key ? null : cur), 150)}
              placeholder={f.placeholder || ""}
              style={inputStyle(invalid)}
            />
            {showSuggest && (
              <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, background: "#fff", border: "1px solid rgba(58,44,34,.15)", borderRadius: 10, boxShadow: "0 8px 24px rgba(58,44,34,.14)", zIndex: 30, overflow: "hidden" }}>
                {suggestions.map((opt) => (
                  <div key={opt} onMouseDown={() => { setField(f.key, opt); setActiveSuggestField(null); }} style={{ padding: "10px 13px", fontSize: 13.5, cursor: "pointer", borderBottom: "1px solid rgba(58,44,34,.06)" }}>{opt}</div>
                ))}
              </div>
            )}
          </div>
        )}
        {isChoice && (
          <>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {f.options!.map((opt) => {
                const selected = data[f.key] === opt;
                return (
                  <button type="button" key={opt} onClick={() => setField(f.key, opt)} style={{ padding: "8px 16px", borderRadius: 999, border: `1.5px solid ${selected ? colors.teal : invalid ? colors.terracotta : "rgba(58,44,34,.2)"}`, background: selected ? colors.teal : "#fff", color: selected ? colors.cream : colors.ink, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                    {opt}
                  </button>
                );
              })}
            </div>
            {f.revealOn && data[f.key] === f.revealOn && !f.revealCountries && !f.revealMonthYear && !f.revealMonthYearList && (
              <div style={{ marginTop: 6 }}>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: "#6b5c4a", marginBottom: 4, textTransform: "uppercase", letterSpacing: ".02em" }}>{f.revealLabel || "Especifica cuál"}</div>
                <input value={data[f.revealKey!] || ""} onChange={(e) => setField(f.revealKey!, e.target.value)} placeholder={f.revealLabel || "Especifica cuál"} style={{ ...inputStyle(showError && !String(data[f.revealKey!] || "").trim()), width: "100%" }} />
              </div>
            )}
            {f.revealOn && data[f.key] === f.revealOn && f.revealMonthYear && (
              <div style={{ marginTop: 6 }}>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: "#6b5c4a", marginBottom: 4, textTransform: "uppercase", letterSpacing: ".02em" }}>{f.revealLabel}</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <select value={data[f.revealKey+'Mes'] || ""} onChange={(e) => setField(f.revealKey+'Mes', e.target.value)} style={{ ...inputStyle(showError && !data[f.revealKey+'Mes']), flex: 1 }}>
                    <option value="">Mes</option>
                    {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <select value={data[f.revealKey+'Anio'] || ""} onChange={(e) => setField(f.revealKey+'Anio', e.target.value)} style={{ ...inputStyle(showError && !data[f.revealKey+'Anio']), flex: 1 }}>
                    <option value="">Año</option>
                    {yearsList().map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>
            )}
            {f.revealOn && data[f.key] === f.revealOn && f.revealMonthYearList && (
              <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: "#6b5c4a", textTransform: "uppercase", letterSpacing: ".02em" }}>{f.revealLabel}</div>
                {(data[f.revealKey!] || []).map((v: any, ri: number) => (
                  <div key={ri} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <select value={v.mes} onChange={(e) => updateRevealDate(f.revealKey!, ri, "mes", e.target.value)} style={{ ...inputStyle(showError && !v.mes), flex: 1 }}>
                      <option value="">Mes</option>
                      {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <select value={v.anio} onChange={(e) => updateRevealDate(f.revealKey!, ri, "anio", e.target.value)} style={{ ...inputStyle(showError && !v.anio), flex: 1 }}>
                      <option value="">Año</option>
                      {yearsList().map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                    <button type="button" onClick={() => removeRevealDate(f.revealKey!, ri)} aria-label="Quitar fecha" style={{ width: 32, height: 32, flexShrink: 0, borderRadius: "50%", border: "none", background: "rgba(58,44,34,.12)", color: colors.ink, fontSize: 13, cursor: "pointer" }}>✕</button>
                  </div>
                ))}
                {(data[f.revealKey!] || []).length < 6 && (
                  <button type="button" onClick={() => addRevealDate(f.revealKey!)} style={{ alignSelf: "flex-start", padding: "7px 16px", borderRadius: 10, border: `1.5px solid ${colors.teal}`, background: "transparent", color: colors.teal, fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}>+ Agregar fecha</button>
                )}
              </div>
            )}
            {f.revealOn && data[f.key] === f.revealOn && f.revealCountries && (
              <div style={{ marginTop: 6 }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {(data[f.revealKey!] || []).map((p: string) => (
                    <div key={p} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 8px 6px 12px", borderRadius: 999, background: colors.teal, color: colors.cream, fontSize: 12.5, fontWeight: 600 }}>
                      <span>{p}</span>
                      <button type="button" onClick={() => removeChip(f.revealKey!, p)} aria-label="Quitar" style={{ width: 16, height: 16, borderRadius: "50%", border: "none", background: "rgba(253,247,236,.2)", color: colors.cream, fontSize: 11, cursor: "pointer" }}>✕</button>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                  <select value="" onChange={(e) => { const v = e.target.value; if (v) addChip(f.revealKey!, v); }} style={{ ...inputStyle(false), flex: 1 }}>
                    <option value="">+ Agregar país…</option>
                    {WORLD_COUNTRIES.filter((c) => !(data[f.revealKey!] || []).includes(c)).map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <button type="button" onClick={() => setField(f.revealKey!, ["Ninguno"])} style={{ padding: "0 16px", borderRadius: 10, border: "1.5px solid rgba(58,44,34,.2)", background: "#fff", color: colors.ink, fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>Ninguno</button>
                </div>
              </div>
            )}
          </>
        )}
        {invalid && <span style={{ fontSize: 11.5, color: colors.terracotta }}>Campo obligatorio</span>}
      </div>
    );
  };

  // Bloque de ubicación (nacimiento / residencia): País → Departamento → Ciudad (Colombia con listas, resto texto libre; ciudad siempre texto libre)
  const LocationBlock = ({ prefix, title }: { prefix: "Nacimiento" | "Residencia"; title: string }) => {
    const paisKey = prefix === "Nacimiento" ? "paisNacimiento" : "paisResidencia";
    const deptoKey = prefix === "Nacimiento" ? "departamentoNacimiento" : "departamentoResidencia";
    const ciudadKey = prefix === "Nacimiento" ? "ciudadNacimiento" : "ciudadResidencia";
    const pais = data[paisKey] || "";
    const depto = data[deptoKey] || "";
    const isColombia = pais === "Colombia";
    const paisInvalid = showError && !pais;
    const deptoInvalid = showError && !depto;
    const ciudadInvalid = showError && !data[ciudadKey];
    return (
      <>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={labelStyle(paisInvalid)}>País de {title} *</label>
          <select value={pais} onChange={(e) => setData((d) => ({ ...d, [paisKey]: e.target.value, [deptoKey]: "", [ciudadKey]: "" }))} style={inputStyle(paisInvalid)}>
            <option value="">Selecciona…</option>
            {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {paisInvalid && <span style={{ fontSize: 11.5, color: colors.terracotta }}>Campo obligatorio</span>}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={labelStyle(deptoInvalid)}>Departamento / Estado de {title} *</label>
          {isColombia ? (
            <select value={depto} onChange={(e) => setData((d) => ({ ...d, [deptoKey]: e.target.value, [ciudadKey]: "" }))} style={inputStyle(deptoInvalid)}>
              <option value="">Selecciona…</option>
              {Object.keys(COLOMBIA_GEO).map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          ) : (
            <input value={depto} onChange={(e) => setField(deptoKey, e.target.value)} placeholder="Departamento / Estado" style={inputStyle(deptoInvalid)} />
          )}
          {deptoInvalid && <span style={{ fontSize: 11.5, color: colors.terracotta }}>Campo obligatorio</span>}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={labelStyle(ciudadInvalid)}>Ciudad de {title} *</label>
          {isColombia ? (
            <select value={data[ciudadKey] || ""} onChange={(e) => setField(ciudadKey, e.target.value)} style={inputStyle(ciudadInvalid)}>
              <option value="">Selecciona…</option>
              {(COLOMBIA_GEO[depto] || []).map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          ) : (
            <input value={data[ciudadKey] || ""} onChange={(e) => setField(ciudadKey, e.target.value)} placeholder="Escribe tu ciudad" style={inputStyle(ciudadInvalid)} />
          )}
          {ciudadInvalid && <span style={{ fontSize: 11.5, color: colors.terracotta }}>Campo obligatorio</span>}
        </div>
      </>
    );
  };

  const gridStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 };

  const paisesVisitadosList: string[] = data.paisesVisitadosList || [];
  const paisesVisitadosInvalid = showError && !paisesVisitadosList.length;
  const experienciasList: Experiencia[] = data.experienciasList || [];
  const showExperiencias = data.ocupacion === "Empleado de empresa" || data.ocupacion === "HGW";
  const experienciasInvalid = showError && showExperiencias && !experienciasList.length;
  const hijosList: Hijo[] = data.hijosList || [];
  const showHijos = data.tieneHijos === "Sí";
  const hijosInvalid = showError && showHijos && !hijosList.length;

  const reviewFields = FIELDS.map((f) => {
    let val = data[f.key];
    if (f.revealOn && val === f.revealOn && f.revealMonthYearList) val = val + " — " + (data[f.revealKey!] || []).map((v: any) => v.mes + " " + v.anio).join(", ");
    else if (f.revealOn && val === f.revealOn && f.revealMonthYear && data[f.revealKey+'Mes']) val = val + " — " + data[f.revealKey+'Mes'] + " " + data[f.revealKey+'Anio'];
    else if (f.revealOn && val === f.revealOn && data[f.revealKey!]) val = val + " — " + (Array.isArray(data[f.revealKey!]) ? data[f.revealKey!].join(", ") : data[f.revealKey!]);
    return { label: f.label, value: val || "" };
  }).filter((r) => r.value);
  const fechaNacIdx = reviewFields.findIndex((r) => r.label === "Fecha de nacimiento");
  reviewFields.splice(fechaNacIdx + 1, 0,
    { label: "País de nacimiento", value: data.paisNacimiento || "" },
    { label: "Departamento / Estado de nacimiento", value: data.departamentoNacimiento || "" },
    { label: "Ciudad de nacimiento", value: data.ciudadNacimiento || "" }
  );
  const direccionIdx = reviewFields.findIndex((r) => r.label === "Dirección de residencia actual");
  reviewFields.splice(direccionIdx + 1, 0,
    { label: "País de residencia", value: data.paisResidencia || "" },
    { label: "Departamento / Estado", value: data.departamentoResidencia || "" },
    { label: "Ciudad", value: data.ciudadResidencia || "" }
  );
  if (paisesVisitadosList.length) reviewFields.push({ label: "Países visitados en los últimos 2 años", value: paisesVisitadosList.join(", ") });
  experienciasList.forEach((e, i) => {
    const fechas = e.actual ? (e.mesInicio + " " + e.anioInicio + " – Actualmente") : (e.mesInicio + " " + e.anioInicio + " – " + e.mesFin + " " + e.anioFin);
    if (e.empresa || e.cargo) reviewFields.push({ label: `Experiencia ${i + 1}`, value: [e.empresa, e.cargo, fechas.trim()].filter(Boolean).join(" — ") });
  });
  hijosList.forEach((h, i) => {
    if (h.nombre || h.fecha || h.nacionalidad) reviewFields.push({ label: `Hijo ${i + 1}`, value: [h.nombre, h.nacionalidad, h.fecha].filter(Boolean).join(" — ") });
  });

  return (
    <div style={{ minHeight: "100vh", padding: "clamp(20px,5vw,56px) 16px", display: "flex", justifyContent: "center", background: colors.bg, color: colors.ink, fontFamily: "'Karla',system-ui,sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 760 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontFamily: "'Marcellus',serif", fontSize: 13, letterSpacing: ".3em", color: colors.terracotta, marginBottom: 8 }}>WONDERLUST · TRÁMITE DE VISA</div>
          <h1 style={{ fontFamily: "'Marcellus',serif", fontSize: "clamp(26px,4vw,36px)", margin: 0, color: colors.teal }}>Formulario Visa China</h1>
          <p style={{ fontSize: 14.5, color: colors.muted, margin: "10px auto 0", maxWidth: 480, lineHeight: 1.55 }}>Completa tus datos con calma — puedes ir y volver entre pasos. Al final tu formulario queda registrado con nosotros para iniciar tu trámite.</p>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", gap: 0, marginBottom: 34, borderBottom: "1px solid rgba(58,44,34,.16)" }}>
          {STEP_LABELS.map((label, i) => (
            <div key={label} style={{ flex: 1, textAlign: "center", paddingBottom: 11, cursor: i < step ? "pointer" : "default", borderBottom: `2px solid ${i <= step ? colors.teal : "transparent"}`, marginBottom: -1, transition: "border-color .25s ease" }} onClick={() => i < step && setStep(i)}>
              <div style={{ fontFamily: "'Marcellus',serif", fontSize: 16, color: i <= step ? colors.teal : colors.faint, marginBottom: 4 }}>{i + 1}</div>
              <div style={{ fontSize: 9.5, letterSpacing: ".09em", color: i === step ? colors.teal : colors.faint, textAlign: "center", textTransform: "uppercase" }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: colors.card, borderRadius: "2px 30px 2px 30px", padding: "clamp(22px,4vw,38px)", border: "1px solid rgba(58,44,34,.16)", boxShadow: "0 1px 0 rgba(58,44,34,.05)" }}>
          {step === 0 && (
            <>
              <div style={{ fontFamily: "'Marcellus',serif", fontSize: 19, color: colors.teal, marginBottom: 4 }}>Datos personales</div>
              <div style={{ fontSize: 13, color: colors.muted, marginBottom: 22 }}>Tal como aparecen en tu pasaporte.</div>
              <div style={gridStyle}>
                {FIELDS.filter((f) => f.step === 0).slice(0, 4).map(renderField)}
                <LocationBlock prefix="Nacimiento" title="nacimiento" />
                {FIELDS.filter((f) => f.step === 0).slice(4).map(renderField)}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div style={{ fontFamily: "'Marcellus',serif", fontSize: 19, color: colors.teal, marginBottom: 4 }}>Contacto y familia</div>
              <div style={{ fontSize: 13, color: colors.muted, marginBottom: 22 }}>Necesitamos estos datos para el formulario consular.</div>
              <div style={{ ...gridStyle, marginBottom: 22 }}>
                {FIELDS.filter((f) => f.step === 1 && !f.key.startsWith("padre") && !f.key.startsWith("madre")).map(renderField)}
                <LocationBlock prefix="Residencia" title="residencia" />
              </div>
              <div style={{ background: colors.bg, borderRadius: 14, padding: "18px 20px", marginBottom: 16 }}>
                <div style={{ fontFamily: "'Marcellus',serif", fontSize: 14.5, color: colors.terracotta, letterSpacing: ".06em", marginBottom: 14 }}>DATOS DEL PADRE</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14 }}>
                  {FIELDS.filter((f) => f.key.startsWith("padre")).map(renderField)}
                </div>
              </div>
              <div style={{ background: colors.bg, borderRadius: 14, padding: "18px 20px" }}>
                <div style={{ fontFamily: "'Marcellus',serif", fontSize: 14.5, color: colors.terracotta, letterSpacing: ".06em", marginBottom: 14 }}>DATOS DE LA MADRE</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14 }}>
                  {FIELDS.filter((f) => f.key.startsWith("madre")).map(renderField)}
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div style={{ fontFamily: "'Marcellus',serif", fontSize: 19, color: colors.teal, marginBottom: 4 }}>China y contacto de emergencia</div>
              <div style={{ fontSize: 13, color: colors.muted, marginBottom: 22 }}>Un contacto de confianza en caso de emergencia durante tu viaje.</div>
              <div style={gridStyle}>{FIELDS.filter((f) => f.step === 2).map(renderField)}</div>
            </>
          )}

          {step === 3 && (
            <>
              <div style={{ fontFamily: "'Marcellus',serif", fontSize: 19, color: colors.teal, marginBottom: 4 }}>Antecedentes y seguridad</div>
              <div style={{ fontSize: 13, color: colors.muted, marginBottom: 22 }}>Preguntas obligatorias del consulado chino. Responde con sinceridad.</div>
              <div style={gridStyle}>{FIELDS.filter((f) => f.step === 3).map(renderField)}</div>
            </>
          )}

          {step === 4 && (
            <>
              <div style={{ fontFamily: "'Marcellus',serif", fontSize: 19, color: colors.teal, marginBottom: 4 }}>Ocupación y viaje</div>
              <div style={{ fontSize: 13, color: colors.muted, marginBottom: 22 }}>Últimos datos antes de revisar tu formulario.</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 22 }}>
                <label style={labelStyle(paisesVisitadosInvalid)}>Países visitados en los últimos 2 años *</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {paisesVisitadosList.map((p) => (
                    <div key={p} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px 8px 14px", borderRadius: 999, background: colors.teal, color: colors.cream, fontSize: 13, fontWeight: 600 }}>
                      <span>{p}</span>
                      <button type="button" onClick={() => setField("paisesVisitadosList", paisesVisitadosList.filter((x) => x !== p))} aria-label="Quitar" style={{ width: 18, height: 18, borderRadius: "50%", border: "none", background: "rgba(253,247,236,.2)", color: colors.cream, fontSize: 12, cursor: "pointer" }}>✕</button>
                    </div>
                  ))}
                </div>
                <select value="" onChange={(e) => { const v = e.target.value; if (v && !paisesVisitadosList.includes(v)) setField("paisesVisitadosList", [...paisesVisitadosList, v]); }} style={inputStyle(paisesVisitadosInvalid)}>
                  <option value="">+ Agregar país…</option>
                  {WORLD_COUNTRIES.filter((c) => !paisesVisitadosList.includes(c)).map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                {paisesVisitadosInvalid && <span style={{ fontSize: 11.5, color: colors.terracotta }}>Agrega al menos un país</span>}
              </div>
              <div style={gridStyle}>{FIELDS.filter((f) => f.step === 4 && f.key === "ocupacion").map(renderField)}</div>
              {showExperiencias && (
                <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 14 }}>
                  {experienciasList.map((e, i) => {
                    const req = (v: any) => showError && !v;
                    const bd = (v: any) => inputStyle(req(v));
                    return (
                      <div key={i} style={{ background: colors.bg, borderRadius: 14, padding: "18px 20px", position: "relative" }}>
                        <button type="button" onClick={() => removeExperiencia(i)} aria-label="Quitar experiencia" style={{ position: "absolute", top: 14, right: 16, width: 24, height: 24, borderRadius: "50%", border: "none", background: "rgba(58,44,34,.12)", color: colors.ink, fontSize: 12, cursor: "pointer" }}>✕</button>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                          <div style={{ fontFamily: "'Marcellus',serif", fontSize: 14.5, color: colors.terracotta, letterSpacing: ".06em" }}>EXPERIENCIA {i + 1}</div>
                          <button type="button" onClick={() => autofillExperienciaHGW(i)} style={{ padding: "5px 14px", borderRadius: 999, border: `1.5px solid ${colors.teal}`, background: "#fff", color: colors.teal, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>HGW</button>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14 }}>
                          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            <label style={labelStyle(req(e.empresa))}>Empresa *</label>
                            <input value={e.empresa} onChange={(ev) => updateExperienciaField(i, "empresa", ev.target.value)} style={bd(e.empresa)} />
                            {req(e.empresa) && <span style={{ fontSize: 11.5, color: colors.terracotta }}>Campo obligatorio</span>}
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            <label style={labelStyle(req(e.cargo))}>Cargo *</label>
                            <input value={e.cargo} onChange={(ev) => updateExperienciaField(i, "cargo", ev.target.value)} style={bd(e.cargo)} />
                            {req(e.cargo) && <span style={{ fontSize: 11.5, color: colors.terracotta }}>Campo obligatorio</span>}
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            <label style={labelStyle(req(e.mesInicio))}>Desde *</label>
                            <div style={{ display: "flex", gap: 8 }}>
                              <select value={e.mesInicio} onChange={(ev) => updateExperienciaField(i, "mesInicio", ev.target.value)} style={{ ...bd(e.mesInicio), flex: 1 }}>
                                <option value="">Mes</option>
                                {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                              </select>
                              <select value={e.anioInicio} onChange={(ev) => updateExperienciaField(i, "anioInicio", ev.target.value)} style={{ ...bd(e.anioInicio), flex: 1 }}>
                                <option value="">Año</option>
                                {yearsList().map((y) => <option key={y} value={y}>{y}</option>)}
                              </select>
                            </div>
                            {req(e.mesInicio) && <span style={{ fontSize: 11.5, color: colors.terracotta }}>Campo obligatorio</span>}
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            <label style={labelStyle(!e.actual && req(e.mesFin))}>Hasta</label>
                            <div style={{ display: "flex", gap: 8 }}>
                              <select value={e.mesFin} onChange={(ev) => updateExperienciaField(i, "mesFin", ev.target.value)} disabled={e.actual} style={{ ...bd(!e.actual && e.mesFin), flex: 1, background: e.actual ? "#efe6d6" : "#fff" }}>
                                <option value="">Mes</option>
                                {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                              </select>
                              <select value={e.anioFin} onChange={(ev) => updateExperienciaField(i, "anioFin", ev.target.value)} disabled={e.actual} style={{ ...bd(!e.actual && e.anioFin), flex: 1, background: e.actual ? "#efe6d6" : "#fff" }}>
                                <option value="">Año</option>
                                {yearsList().map((y) => <option key={y} value={y}>{y}</option>)}
                              </select>
                            </div>
                            <label style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 2, fontSize: 12.5, color: colors.ink, cursor: "pointer" }}>
                              <input type="checkbox" checked={e.actual} onChange={() => toggleExperienciaActual(i)} style={{ width: 15, height: 15 }} />
                              Actualmente
                            </label>
                            {!e.actual && req(e.mesFin) && <span style={{ fontSize: 11.5, color: colors.terracotta }}>Campo obligatorio</span>}
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            <label style={labelStyle(req(e.direccion))}>Dirección de la empresa *</label>
                            <input value={e.direccion} onChange={(ev) => updateExperienciaField(i, "direccion", ev.target.value)} style={bd(e.direccion)} />
                            {req(e.direccion) && <span style={{ fontSize: 11.5, color: colors.terracotta }}>Campo obligatorio</span>}
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            <label style={labelStyle(req(e.telefono))}>Teléfono de la empresa *</label>
                            <input value={e.telefono} onChange={(ev) => updateExperienciaField(i, "telefono", ev.target.value)} style={bd(e.telefono)} />
                            {req(e.telefono) && <span style={{ fontSize: 11.5, color: colors.terracotta }}>Campo obligatorio</span>}
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            <label style={labelStyle(req(e.supervisor))}>Nombre del supervisor *</label>
                            <input value={e.supervisor} onChange={(ev) => updateExperienciaField(i, "supervisor", ev.target.value)} style={bd(e.supervisor)} />
                            {req(e.supervisor) && <span style={{ fontSize: 11.5, color: colors.terracotta }}>Campo obligatorio</span>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {experienciasInvalid && <span style={{ fontSize: 11.5, color: colors.terracotta }}>Agrega al menos una experiencia laboral</span>}
                  {experienciasList.length < 5 && (
                    <button type="button" onClick={addExperiencia} style={{ alignSelf: "flex-start", padding: "10px 20px", borderRadius: 10, border: `1.5px solid ${colors.teal}`, background: "transparent", color: colors.teal, fontSize: 13.5, fontWeight: 700, cursor: "pointer" }}>+ Agregar experiencia laboral</button>
                  )}
                </div>
              )}
              <div style={{ ...gridStyle, marginTop: 22 }}>{FIELDS.filter((f) => f.step === 4 && f.key !== "ocupacion").map(renderField)}</div>
              {showHijos && (
                <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 14 }}>
                  {hijosList.map((h, i) => {
                    const nombreInvalid = showError && !h.nombre.trim();
                    const fechaInvalid = showError && !h.fecha;
                    return (
                      <div key={i} style={{ background: colors.bg, borderRadius: 14, padding: "18px 20px", position: "relative" }}>
                        <button type="button" onClick={() => removeHijo(i)} aria-label="Quitar hijo" style={{ position: "absolute", top: 14, right: 16, width: 24, height: 24, borderRadius: "50%", border: "none", background: "rgba(58,44,34,.12)", color: colors.ink, fontSize: 12, cursor: "pointer" }}>✕</button>
                        <div style={{ fontFamily: "'Marcellus',serif", fontSize: 14.5, color: colors.terracotta, letterSpacing: ".06em", marginBottom: 14 }}>HIJO {i + 1}</div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14 }}>
                          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            <label style={labelStyle(nombreInvalid)}>Nombre completo *</label>
                            <input value={h.nombre} onChange={(e) => updateHijoField(i, "nombre", e.target.value)} style={inputStyle(nombreInvalid)} />
                            {nombreInvalid && <span style={{ fontSize: 11.5, color: colors.terracotta }}>Campo obligatorio</span>}
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            <label style={labelStyle(fechaInvalid)}>Fecha de nacimiento *</label>
                            <input type="date" value={h.fecha} onChange={(e) => updateHijoField(i, "fecha", e.target.value)} style={inputStyle(fechaInvalid)} />
                            {fechaInvalid && <span style={{ fontSize: 11.5, color: colors.terracotta }}>Campo obligatorio</span>}
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            <label style={labelStyle(false)}>Nacionalidad</label>
                            <input value={h.nacionalidad} onChange={(e) => updateHijoField(i, "nacionalidad", e.target.value)} style={inputStyle(false)} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {hijosInvalid && <span style={{ fontSize: 11.5, color: colors.terracotta }}>Agrega al menos un hijo</span>}
                  {hijosList.length < 6 && (
                    <button type="button" onClick={addHijo} style={{ alignSelf: "flex-start", padding: "10px 20px", borderRadius: 10, border: `1.5px solid ${colors.teal}`, background: "transparent", color: colors.teal, fontSize: 13.5, fontWeight: 700, cursor: "pointer" }}>+ Agregar hijo</button>
                  )}
                </div>
              )}
            </>
          )}

          {step === 5 && !submitted && (
            <>
              <div style={{ fontFamily: "'Marcellus',serif", fontSize: 19, color: colors.teal, marginBottom: 4 }}>Revisa y envía</div>
              <div style={{ fontSize: 13, color: colors.muted, marginBottom: 20 }}>Verifica tus respuestas antes de enviar tu formulario.</div>
              <div style={{ background: colors.bg, borderRadius: 14, padding: "16px 18px", maxHeight: 340, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
                {reviewFields.map((r, i) => (
                  <div key={r.label + i} style={{ display: "flex", justifyContent: "space-between", gap: 14, fontSize: 13, borderBottom: "1px solid rgba(58,44,34,.08)", paddingBottom: 8 }}>
                    <span style={{ color: colors.muted, flexShrink: 0, maxWidth: "55%" }}>{r.label}</span>
                    <span style={{ fontWeight: 600, textAlign: "right" }}>{r.value}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start", background: "#fff", border: "1px solid rgba(58,44,34,.14)", padding: "14px 16px", marginBottom: 22 }}>
                <div style={{ width: 3, alignSelf: "stretch", background: "#e0a94a", flexShrink: 0 }} />
                <div style={{ fontSize: 13, lineHeight: 1.5 }}>No olvides tener a la mano la <strong>foto de tu pasaporte</strong>: te la pediremos en el siguiente paso de tu trámite.</div>
              </div>
              <button type="button" onClick={submitForm} disabled={submitting} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: colors.teal, color: colors.cream, fontSize: 14, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", padding: 16, border: "none", borderRadius: "2px 14px 2px 14px", cursor: "pointer" }}>
                Enviar formulario
              </button>
            </>
          )}

          {submitted && (
            <div style={{ textAlign: "center", padding: "30px 10px" }}>
              <div style={{ width: 62, height: 62, borderRadius: "50%", border: `2px solid ${colors.teal}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", transform: "rotate(-8deg)" }}>
                <span style={{ fontFamily: "'Marcellus',serif", fontSize: 26, color: colors.teal, transform: "rotate(8deg)" }}>✓</span>
              </div>
              <div style={{ fontFamily: "'Marcellus',serif", fontSize: 22, color: colors.teal, marginBottom: 10 }}>¡Formulario recibido!</div>
              <div style={{ fontSize: 14, color: colors.muted, lineHeight: 1.6, maxWidth: 420, margin: "0 auto" }}>Ya guardamos tus datos de forma privada. Nuestro equipo se pondrá en contacto contigo para continuar con tu trámite de Visa China.</div>
            </div>
          )}

          {showError && step !== 5 && <div style={{ marginTop: 16, color: colors.terracotta, fontSize: 13, fontWeight: 600 }}>Por favor completa los campos marcados con * antes de continuar.</div>}

          {!submitted && (
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginTop: 28, paddingTop: 22, borderTop: "1px solid rgba(58,44,34,.08)" }}>
              {step === 0 ? <span /> : <button type="button" onClick={goBack} style={{ padding: "13px 6px", border: "none", background: "transparent", color: colors.muted, fontSize: 14, fontWeight: 600, cursor: "pointer", letterSpacing: ".02em" }}>← Atrás</button>}
              {step !== 5 && <button type="button" onClick={goNext} style={{ padding: "13px 28px", borderRadius: "2px 12px 2px 12px", border: "none", background: colors.teal, color: colors.cream, fontSize: 14, fontWeight: 700, letterSpacing: ".03em", cursor: "pointer" }}>Siguiente →</button>}
            </div>
          )}
        </div>

        <div style={{ textAlign: "center", fontSize: 12, color: colors.faint, marginTop: 20 }}>Wonderlust — Agencia de viajes · Bogotá · Tus datos solo se usan para tramitar tu visa.</div>
      </div>
    </div>
  );
}
