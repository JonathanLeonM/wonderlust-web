"use client";

/**
 * Formulario Visa China — Wonderlust
 * Página autónoma (Next.js App Router). Copiar en: app/visa-china/page.tsx
 *
 * Las respuestas se guardan en la hoja privada de Google Sheets a través del
 * webhook de Apps Script definido en SHEETS_WEBHOOK_URL.
 */

import { useMemo, useState } from "react";

const SHEETS_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbyyjjr2jBzJygb-i2_l_D6WtsdwX0T2ThOhIJCCAMeRvXwZrwtzFox5e02iHrqikV9OvQ/exec";

const INK = "#3a2c22";
const TEAL = "#14514f";
const TERRA = "#bd5a34";
const CREAM = "#f7f0e4";
const CARD = "#fdf9f0";
const MUTED = "#7c6a58";
const BORDER = "1px solid rgba(58,44,34,.18)";
const BORDER_ERR = "1.5px solid #bd5a34";

const COLOMBIA_GEO: Record<string, string[]> = {
  'Amazonas': ['Leticia', 'Puerto Nariño'],
  'Antioquia': ['Abejorral', 'Abriaquí', 'Alejandría', 'Amagá', 'Amalfi', 'Andes', 'Angelópolis', 'Angostura', 'Anorí', 'Anzá', 'Apartadó', 'Arboletes', 'Argelia', 'Armenia', 'Barbosa', 'Bello', 'Belmira', 'Betania', 'Betulia', 'Briceño', 'Buriticá', 'Cáceres', 'Caicedo', 'Caldas', 'Campamento', 'Cañasgordas', 'Caracolí', 'Caramanta', 'Carepa', 'Carolina del Príncipe', 'Caucasia', 'Chigorodó', 'Cisneros', 'Ciudad Bolívar', 'Cocorná', 'Concepción', 'Concordia', 'Copacabana', 'Dabeiba', 'Donmatías', 'Ebéjico', 'El Bagre', 'El Carmen de Viboral', 'El Peñol', 'El Retiro', 'El Santuario', 'Entrerríos', 'Envigado', 'Fredonia', 'Frontino', 'Giraldo', 'Girardota', 'Gómez Plata', 'Granada', 'Guadalupe', 'Guarne', 'Guatapé', 'Heliconia', 'Hispania', 'Itagüí', 'Ituango', 'Jardín', 'Jericó', 'La Ceja', 'La Estrella', 'La Pintada', 'La Unión', 'Liborina', 'Maceo', 'Marinilla', 'Medellín', 'Montebello', 'Murindó', 'Mutatá', 'Nariño', 'Nechí', 'Necoclí', 'Olaya', 'Peque', 'Pueblorrico', 'Puerto Berrío', 'Puerto Nare', 'Puerto Triunfo', 'Remedios', 'Rionegro', 'Sabanalarga', 'Sabaneta', 'Salgar', 'San Andrés de Cuerquia', 'San Carlos', 'San Francisco', 'San Jerónimo', 'San José de la Montaña', 'San Juan de Urabá', 'San Luis', 'San Pedro de Urabá', 'San Pedro de los Milagros', 'San Rafael', 'San Roque', 'San Vicente', 'Santa Bárbara', 'Santa Fe de Antioquia', 'Santa Rosa de Osos', 'Santo Domingo', 'Segovia', 'Sonsón', 'Sopetrán', 'Támesis', 'Tarazá', 'Tarso', 'Titiribí', 'Toledo', 'Turbo', 'Uramita', 'Urrao', 'Valdivia', 'Valparaíso', 'Vegachí', 'Venecia', 'Vigía del Fuerte', 'Yalí', 'Yarumal', 'Yolombó', 'Yondó', 'Zaragoza'],
  'Arauca': ['Arauca', 'Arauquita', 'Cravo Norte', 'Fortul', 'Puerto Rondón', 'Saravena', 'Tame'],
  'Atlántico': ['Baranoa', 'Barranquilla', 'Campo de la Cruz', 'Candelaria', 'Galapa', 'Juan de Acosta', 'Luruaco', 'Malambo', 'Manatí', 'Palmar de Varela', 'Piojó', 'Polonuevo', 'Ponedera', 'Puerto Colombia', 'Repelón', 'Sabanagrande', 'Sabanalarga', 'Santa Lucía', 'Santo Tomás', 'Soledad', 'Suán', 'Tubará', 'Usiacurí'],
  'Bolívar': ['Achí', 'Altos del Rosario', 'Arenal', 'Arjona', 'Arroyohondo', 'Barranco de Loba', 'Brazuelo de Papayal', 'Calamar', 'Cantagallo', 'Cartagena de Indias', 'Cicuco', 'Clemencia', 'Córdoba', 'El Carmen de Bolívar', 'El Guamo', 'El Peñón', 'Hatillo de Loba', 'Magangué', 'Mahates', 'Margarita', 'María la Baja', 'Mompós', 'Montecristo', 'Morales', 'Norosí', 'Pinillos', 'Regidor', 'Río Viejo', 'San Cristóbal', 'San Estanislao', 'San Fernando', 'San Jacinto del Cauca', 'San Jacinto', 'San Juan Nepomuceno', 'San Martín de Loba', 'San Pablo', 'Santa Catalina', 'Santa Rosa', 'Santa Rosa del Sur', 'Simití', 'Soplaviento', 'Talaigua Nuevo', 'Tiquisio', 'Turbaco', 'Turbaná', 'Villanueva', 'Zambrano'],
  'Boyacá': ['Almeida', 'Aquitania', 'Arcabuco', 'Belén', 'Berbeo', 'Betéitiva', 'Boavita', 'Boyacá', 'Briceño', 'Buenavista', 'Busbanzá', 'Caldas', 'Campohermoso', 'Cerinza', 'Chinavita', 'Chiquinquirá', 'Chíquiza', 'Chiscas', 'Chita', 'Chitaraque', 'Chivatá', 'Chivor', 'Ciénega', 'Cómbita', 'Coper', 'Corrales', 'Covarachía', 'Cubará', 'Cucaita', 'Cuítiva', 'Duitama', 'El Cocuy', 'El Espino', 'Firavitoba', 'Floresta', 'Gachantivá', 'Gámeza', 'Garagoa', 'Guacamayas', 'Guateque', 'Guayatá', 'Güicán', 'Iza', 'Jenesano', 'Jericó', 'La Capilla', 'La Uvita', 'La Victoria', 'Labranzagrande', 'Macanal', 'Maripí', 'Miraflores', 'Mongua', 'Monguí', 'Moniquirá', 'Motavita', 'Muzo', 'Nobsa', 'Nuevo Colón', 'Oicatá', 'Otanche', 'Pachavita', 'Páez', 'Paipa', 'Pajarito', 'Panqueba', 'Pauna', 'Paya', 'Paz del Río', 'Pesca', 'Pisba', 'Puerto Boyacá', 'Quípama', 'Ramiriquí', 'Ráquira', 'Rondón', 'Saboyá', 'Sáchica', 'Samacá', 'San Eduardo', 'San José de Pare', 'San Luis de Gaceno', 'San Mateo', 'San Miguel de Sema', 'San Pablo de Borbur', 'Santa María', 'Santa Rosa de Viterbo', 'Santa Sofía', 'Santana', 'Sativanorte', 'Sativasur', 'Siachoque', 'Soatá', 'Socha', 'Socotá', 'Sogamoso', 'Somondoco', 'Sora', 'Soracá', 'Sotaquirá', 'Susacón', 'Sutamarchán', 'Sutatenza', 'Tasco', 'Tenza', 'Tibaná', 'Tibasosa', 'Tinjacá', 'Tipacoque', 'Toca', 'Togüí', 'Tópaga', 'Tota', 'Tunja', 'Tununguá', 'Turmequé', 'Tuta', 'Tutazá', 'Úmbita', 'Ventaquemada', 'Villa de Leyva', 'Viracachá', 'Zetaquira'],
  'Caldas': ['Aguadas', 'Anserma', 'Aranzazu', 'Belalcázar', 'Chinchiná', 'Filadelfia', 'La Dorada', 'La Merced', 'Manizales', 'Manzanares', 'Marmato', 'Marquetalia', 'Marulanda', 'Neira', 'Norcasia', 'Pácora', 'Palestina', 'Pensilvania', 'Riosucio', 'Risaralda', 'Salamina', 'Samaná', 'San José', 'Supía', 'Victoria', 'Villamaría', 'Viterbo'],
  'Caquetá': ['Albania', 'Belén de los Andaquíes', 'Cartagena del Chairá', 'Curillo', 'El Doncello', 'El Paujil', 'Florencia', 'La Montañita', 'Milán', 'Morelia', 'Puerto Rico', 'San José del Fragua', 'San Vicente del Caguán', 'Solano', 'Solita', 'Valparaíso'],
  'Casanare': ['Aguazul', 'Chámeza', 'Hato Corozal', 'La Salina', 'Maní', 'Monterrey', 'Nunchía', 'Orocué', 'Paz de Ariporo', 'Pore', 'Recetor', 'Sabanalarga', 'Sácama', 'San Luis de Palenque', 'Támara', 'Tauramena', 'Trinidad', 'Villanueva', 'Yopal'],
  'Cauca': ['Almaguer', 'Argelia', 'Balboa', 'Bolívar', 'Buenos Aires', 'Cajibío', 'Caldono', 'Caloto', 'Corinto', 'El Tambo', 'Florencia', 'Guachené', 'Guapí', 'Inzá', 'Jambaló', 'La Sierra', 'La Vega', 'López de Micay', 'Mercaderes', 'Miranda', 'Morales', 'Padilla', 'Páez', 'Patía', 'Piamonte', 'Piendamó', 'Popayán', 'Puerto Tejada', 'Puracé', 'Rosas', 'San Sebastián', 'Santa Rosa', 'Santander de Quilichao', 'Silvia', 'Sotará', 'Suárez', 'Sucre', 'Timbío', 'Timbiquí', 'Toribío', 'Totoró', 'Villa Rica'],
  'Cesar': ['Aguachica', 'Agustín Codazzi', 'Astrea', 'Becerril', 'Bosconia', 'Chimichagua', 'Chiriguaná', 'Curumaní', 'El Copey', 'El Paso', 'Gamarra', 'González', 'La Gloria', 'La Jagua de Ibirico', 'La Paz', 'Manaure Balcón del Cesar', 'Pailitas', 'Pelaya', 'Pueblo Bello', 'Río de Oro', 'San Alberto', 'San Diego', 'San Martín', 'Tamalameque', 'Valledupar'],
  'Chocó': ['Acandí', 'Alto Baudó', 'Bagadó', 'Bahía Solano', 'Bajo Baudó', 'Bojayá', 'Cantón de San Pablo', 'Cértegui', 'Condoto', 'El Atrato', 'El Carmen de Atrato', 'El Carmen del Darién', 'Istmina', 'Juradó', 'Litoral de San Juan', 'Lloró', 'Medio Atrato', 'Medio Baudó', 'Medio San Juan', 'Nóvita', 'Nuquí', 'Quibdó', 'Río Iró', 'Río Quito', 'Riosucio', 'San José del Palmar', 'Sipí', 'Tadó', 'Unión Panamericana', 'Unguía'],
  'Cundinamarca': ['Agua de Dios', 'Albán', 'Anapoima', 'Anolaima', 'Apulo', 'Arbeláez', 'Beltrán', 'Bituima', 'Bojacá', 'Cabrera', 'Cachipay', 'Cajicá', 'Caparrapí', 'Cáqueza', 'Carmen de Carupa', 'Chaguaní', 'Chía', 'Chipaque', 'Choachí', 'Chocontá', 'Cogua', 'Cota', 'Cucunubá', 'El Colegio', 'El Peñón', 'El Rosal', 'Facatativá', 'Fómeque', 'Fosca', 'Funza', 'Fúquene', 'Fusagasugá', 'Gachalá', 'Gachancipá', 'Gachetá', 'Gama', 'Girardot', 'Granada', 'Guachetá', 'Guaduas', 'Guasca', 'Guataquí', 'Guatavita', 'Guayabal de Síquima', 'Guayabetal', 'Gutiérrez', 'Jerusalén', 'Junín', 'La Calera', 'La Mesa', 'La Palma', 'La Peña', 'La Vega', 'Lenguazaque', 'Machetá', 'Madrid', 'Manta', 'Medina', 'Mosquera', 'Nariño', 'Nemocón', 'Nilo', 'Nimaima', 'Nocaima', 'Pacho', 'Paime', 'Pandi', 'Paratebueno', 'Pasca', 'Puerto Salgar', 'Pulí', 'Quebradanegra', 'Quetame', 'Quipile', 'Ricaurte', 'San Antonio del Tequendama', 'San Bernardo', 'San Cayetano', 'San Francisco', 'San Juan de Rioseco', 'Sasaima', 'Sesquilé', 'Sibaté', 'Silvania', 'Simijaca', 'Soacha', 'Sopó', 'Subachoque', 'Suesca', 'Supatá', 'Susa', 'Sutatausa', 'Tabio', 'Tausa', 'Tena', 'Tenjo', 'Tibacuy', 'Tibirita', 'Tocaima', 'Tocancipá', 'Topaipí', 'Ubalá', 'Ubaque', 'Ubaté', 'Une', 'Útica', 'Venecia', 'Vergara', 'Vianí', 'Villagómez', 'Villapinzón', 'Villeta', 'Viotá', 'Yacopí', 'Zipacón', 'Zipaquirá'],
  'Córdoba': ['Ayapel', 'Buenavista', 'Canalete', 'Cereté', 'Chimá', 'Chinú', 'Ciénaga de Oro', 'Cotorra', 'La Apartada', 'Lorica', 'Los Córdobas', 'Momil', 'Montelíbano', 'Montería', 'Moñitos', 'Planeta Rica', 'Pueblo Nuevo', 'Puerto Escondido', 'Puerto Libertador', 'Purísima', 'Sahagún', 'San Andrés de Sotavento', 'San Antero', 'San Bernardo del Viento', 'San Carlos', 'San José de Uré', 'San Pelayo', 'Tierralta', 'Tuchín', 'Valencia'],
  'Guainía': ['Inírida'],
  'Guaviare': ['Calamar', 'El Retorno', 'Miraflores', 'San José del Guaviare'],
  'Huila': ['Acevedo', 'Agrado', 'Aipe', 'Algeciras', 'Altamira', 'Baraya', 'Campoalegre', 'Colombia', 'El Pital', 'Elías', 'Garzón', 'Gigante', 'Guadalupe', 'Hobo', 'Íquira', 'Isnos', 'La Argentina', 'La Plata', 'Nátaga', 'Neiva', 'Oporapa', 'Paicol', 'Palermo', 'Palestina', 'Pitalito', 'Rivera', 'Saladoblanco', 'San Agustín', 'Santa María', 'Suaza', 'Tarqui', 'Tello', 'Teruel', 'Tesalia', 'Timaná', 'Villavieja', 'Yaguará'],
  'La Guajira': ['Albania', 'Barrancas', 'Dibulla', 'Distracción', 'El Molino', 'Fonseca', 'Hatonuevo', 'La Jagua del Pilar', 'Maicao', 'Manaure', 'Riohacha', 'San Juan del Cesar', 'Uribia', 'Urumita', 'Villanueva'],
  'Magdalena': ['Algarrobo', 'Aracataca', 'Ariguaní', 'Cerro de San Antonio', 'Chibolo', 'Ciénaga', 'Concordia', 'El Banco', 'El Piñón', 'El Retén', 'Fundación', 'Guamal', 'Nueva Granada', 'Pedraza', 'Pijiño del Carmen', 'Pivijay', 'Plato', 'Pueblo Viejo', 'Remolino', 'Sabanas de San Ángel', 'Salamina', 'San Sebastián de Buenavista', 'San Zenón', 'Santa Ana', 'Santa Bárbara de Pinto', 'Santa Marta', 'Sitionuevo', 'Tenerife', 'Zapayán', 'Zona Bananera'],
  'Meta': ['Acacías', 'Barranca de Upía', 'Cabuyaro', 'Castilla la Nueva', 'Cubarral', 'Cumaral', 'El Calvario', 'El Castillo', 'El Dorado', 'Fuente de Oro', 'Granada', 'Guamal', 'La Macarena', 'La Uribe', 'Lejanías', 'Mapiripán', 'Mesetas', 'Puerto Concordia', 'Puerto Gaitán', 'Puerto Lleras', 'Puerto López', 'Puerto Rico', 'Restrepo', 'San Carlos de Guaroa', 'San Juan de Arama', 'San Juanito', 'San Martín', 'Villavicencio', 'Vista Hermosa'],
  'Nariño': ['Aldana', 'Ancuyá', 'Arboleda', 'Barbacoas', 'Belén', 'Buesaco', 'Chachagüí', 'Colón', 'Consacá', 'Contadero', 'Córdoba', 'Cuaspud', 'Cumbal', 'Cumbitara', 'El Charco', 'El Peñol', 'El Rosario', 'El Tablón', 'El Tambo', 'Francisco Pizarro', 'Funes', 'Guachucal', 'Guaitarilla', 'Gualmatán', 'Iles', 'Imués', 'Ipiales', 'La Cruz', 'La Florida', 'La Llanada', 'La Tola', 'La Unión', 'Leiva', 'Linares', 'Los Andes', 'Magüí Payán', 'Mallama', 'Mosquera', 'Nariño', 'Olaya Herrera', 'Ospina', 'Pasto', 'Policarpa', 'Potosí', 'Providencia', 'Puerres', 'Pupiales', 'Ricaurte', 'Roberto Payán', 'Samaniego', 'San Bernardo', 'San José de Albán', 'San Lorenzo', 'San Pablo', 'San Pedro de Cartago', 'Sandoná', 'Santa Bárbara', 'Santacruz', 'Sapuyes', 'Taminango', 'Tangua', 'Tumaco', 'Túquerres', 'Yacuanquer'],
  'Norte de Santander': ['Ábrego', 'Arboledas', 'Bochalema', 'Bucarasica', 'Cáchira', 'Cácota', 'Chinácota', 'Chitagá', 'Convención', 'Cúcuta', 'Cucutilla', 'Duranía', 'El Carmen', 'El Tarra', 'El Zulia', 'Gramalote', 'Hacarí', 'Herrán', 'La Esperanza', 'La Playa de Belén', 'Labateca', 'Los Patios', 'Lourdes', 'Mutiscua', 'Ocaña', 'Pamplona', 'Pamplonita', 'Puerto Santander', 'Ragonvalia', 'Salazar de Las Palmas', 'San Calixto', 'San Cayetano', 'Santiago', 'Santo Domingo de Silos', 'Sardinata', 'Teorama', 'Tibú', 'Toledo', 'Villa Caro', 'Villa del Rosario'],
  'Putumayo': ['Colón', 'Mocoa', 'Orito', 'Puerto Asís', 'Puerto Caicedo', 'Puerto Guzmán', 'Puerto Leguízamo', 'San Francisco', 'San Miguel', 'Santiago', 'Sibundoy', 'Valle del Guamuez', 'Villagarzón'],
  'Quindío': ['Armenia', 'Buenavista', 'Calarcá', 'Circasia', 'Córdoba', 'Filandia', 'Génova', 'La Tebaida', 'Montenegro', 'Pijao', 'Quimbaya', 'Salento'],
  'Risaralda': ['Apía', 'Balboa', 'Belén de Umbría', 'Dosquebradas', 'Guática', 'La Celia', 'La Virginia', 'Marsella', 'Mistrató', 'Pereira', 'Pueblo Rico', 'Quinchía', 'Santa Rosa de Cabal', 'Santuario'],
  'San Andrés y Providencia': ['Providencia y Santa Catalina Islas', 'San Andrés'],
  'Santander': ['Aguada', 'Albania', 'Aratoca', 'Barbosa', 'Barichara', 'Barrancabermeja', 'Betulia', 'Bolívar', 'Bucaramanga', 'Cabrera', 'California', 'Capitanejo', 'Carcasí', 'Cepitá', 'Cerrito', 'Charalá', 'Charta', 'Chima', 'Chipatá', 'Cimitarra', 'Concepción', 'Confines', 'Contratación', 'Coromoro', 'Curití', 'El Carmen de Chucurí', 'El Guacamayo', 'El Peñón', 'El Playón', 'El Socorro', 'Encino', 'Enciso', 'Florián', 'Floridablanca', 'Galán', 'Gámbita', 'Girón', 'Guaca', 'Guadalupe', 'Guapotá', 'Guavatá', 'Güepsa', 'Hato', 'Jesús María', 'Jordán', 'La Belleza', 'La Paz', 'Landázuri', 'Lebrija', 'Los Santos', 'Macaravita', 'Málaga', 'Matanza', 'Mogotes', 'Molagavita', 'Ocamonte', 'Oiba', 'Onzaga', 'Palmar', 'Palmas del Socorro', 'Páramo', 'Piedecuesta', 'Pinchote', 'Puente Nacional', 'Puerto Parra', 'Puerto Wilches', 'Rionegro', 'Sabana de Torres', 'San Andrés', 'San Benito', 'San Gil', 'San Joaquín', 'San José de Miranda', 'San Miguel', 'San Vicente de Chucurí', 'Santa Bárbara', 'Santa Helena del Opón', 'Simacota', 'Suaita', 'Sucre', 'Suratá', 'Tona', 'Valle de San José', 'Vélez', 'Vetas', 'Villanueva', 'Zapatoca'],
  'Sucre': ['Buenavista', 'Caimito', 'Chalán', 'Coloso', 'Corozal', 'Coveñas', 'El Roble', 'Galeras', 'Guaranda', 'La Unión', 'Los Palmitos', 'Majagual', 'Morroa', 'Ovejas', 'Sampués', 'San Antonio de Palmito', 'San Benito Abad', 'San Juan de Betulia', 'San Marcos', 'San Onofre', 'San Pedro', 'Sincé', 'Sincelejo', 'Sucre', 'Tolú', 'Tolú Viejo'],
  'Tolima': ['Alpujarra', 'Alvarado', 'Ambalema', 'Anzoátegui', 'Armero', 'Ataco', 'Cajamarca', 'Carmen de Apicalá', 'Casabianca', 'Chaparral', 'Coello', 'Coyaima', 'Cunday', 'Dolores', 'El Espinal', 'Falán', 'Flandes', 'Fresno', 'Guamo', 'Herveo', 'Honda', 'Ibagué', 'Icononzo', 'Lérida', 'Líbano', 'Mariquita', 'Melgar', 'Murillo', 'Natagaima', 'Ortega', 'Palocabildo', 'Piedras', 'Planadas', 'Prado', 'Purificación', 'Rioblanco', 'Roncesvalles', 'Rovira', 'Saldaña', 'San Antonio', 'San Luis', 'Santa Isabel', 'Suárez', 'Valle de San Juan', 'Venadillo', 'Villahermosa', 'Villarrica'],
  'Valle del Cauca': ['Alcalá', 'Andalucía', 'Ansermanuevo', 'Argelia', 'Bolívar', 'Buenaventura', 'Buga', 'Bugalagrande', 'Caicedonia', 'Cali', 'Calima', 'Candelaria', 'Cartago', 'Dagua', 'El Águila', 'El Cairo', 'El Cerrito', 'El Dovio', 'Florida', 'Ginebra', 'Guacarí', 'Jamundí', 'La Cumbre', 'La Unión', 'La Victoria', 'Obando', 'Palmira', 'Pradera', 'Restrepo', 'Riofrío', 'Roldanillo', 'San Pedro', 'Sevilla', 'Toro', 'Trujillo', 'Tuluá', 'Ulloa', 'Versalles', 'Vijes', 'Yotoco', 'Yumbo', 'Zarzal'],
  'Vaupés': ['Carurú', 'Mitú', 'Taraira'],
  'Vichada': ['Cumaribo', 'La Primavera', 'Puerto Carreño', 'Santa Rosalía'],
  'Bogotá D.C.': ['Bogotá'],
};
function deptoKeysBogotaFirst(): string[] {
  const keys = Object.keys(COLOMBIA_GEO);
  return ['Bogotá D.C.', ...keys.filter(k => k !== 'Bogotá D.C.')];
}
const EMAIL_DOMAINS = ['gmail.com','hotmail.com','outlook.com','yahoo.com','icloud.com'];
const COUNTRIES = ['Colombia','México','Perú','Ecuador','Venezuela','Chile','Argentina','España','Estados Unidos','Otro'];
const WORLD_COUNTRIES = ['Afganistán','Albania','Alemania','Andorra','Angola','Antigua y Barbuda','Arabia Saudita','Argelia','Argentina','Armenia','Aruba','Australia','Austria','Azerbaiyán','Bahamas','Baréin','Bangladés','Barbados','Bélgica','Belice','Benín','Bielorrusia','Birmania (Myanmar)','Bolivia','Bosnia y Herzegovina','Botsuana','Brasil','Brunéi','Bulgaria','Burkina Faso','Burundi','Bután','Cabo Verde','Camboya','Camerún','Canadá','Catar','Chad','Chile','China','Chipre','Ciudad del Vaticano','Colombia','Comoras','Corea del Norte','Corea del Sur','Costa de Marfil','Costa Rica','Croacia','Cuba','Curazao','Dinamarca','Dominica','Ecuador','Egipto','El Salvador','Emiratos Árabes Unidos','Eritrea','Eslovaquia','Eslovenia','España','Estados Unidos','Estonia','Esuatini','Etiopía','Filipinas','Finlandia','Fiyi','Francia','Gabón','Gambia','Georgia','Ghana','Granada','Grecia','Groenlandia','Guatemala','Guyana','Guinea','Guinea-Bisáu','Guinea Ecuatorial','Haití','Honduras','Hong Kong','Hungría','India','Indonesia','Irak','Irán','Irlanda','Islandia','Islas Caimán','Islas Salomón','Israel','Italia','Jamaica','Japón','Jordania','Kazajistán','Kenia','Kirguistán','Kiribati','Kosovo','Kuwait','Laos','Lesoto','Letonia','Líbano','Liberia','Libia','Liechtenstein','Lituania','Luxemburgo','Macao','Macedonia del Norte','Madagascar','Malasia','Malaui','Maldivas','Malí','Malta','Marruecos','Marshall, Islas','Mauricio','Mauritania','México','Micronesia','Moldavia','Mónaco','Mongolia','Montenegro','Mozambique','Namibia','Nauru','Nepal','Nicaragua','Níger','Nigeria','Noruega','Nueva Zelanda','Omán','Países Bajos','Pakistán','Palaos','Palestina','Panamá','Papúa Nueva Guinea','Paraguay','Perú','Polonia','Portugal','Puerto Rico','Reino Unido','República Centroafricana','República Checa','República Democrática del Congo','República Dominicana','República del Congo','Ruanda','Rumanía','Rusia','Samoa','San Cristóbal y Nieves','San Marino','San Vicente y las Granadinas','Santa Lucía','Santo Tomé y Príncipe','Senegal','Serbia','Seychelles','Sierra Leona','Singapur','Siria','Somalia','Sri Lanka','Sudáfrica','Sudán','Sudán del Sur','Suecia','Suiza','Surinam','Tailandia','Taiwán','Tanzania','Tayikistán','Timor Oriental','Togo','Tonga','Trinidad y Tobago','Túnez','Turkmenistán','Turquía','Tuvalu','Ucrania','Uganda','Uruguay','Uzbekistán','Vanuatu','Venezuela','Vietnam','Yemen','Yibuti','Zambia','Zimbabue'];

const MONTHS = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
function currentMonthYear(): { mes: string; anio: string } { const d = new Date(); return { mes: MONTHS[d.getMonth()], anio: String(d.getFullYear()) }; }
function yearsList(): string[] { const y = new Date().getFullYear(); const out: string[] = []; for (let i = y; i >= y - 60; i--) out.push(String(i)); return out; }
const CONSENT_TEXT = 'Autorizo a Wonderlust el tratamiento de mis datos personales conforme a la Ley 1581 de 2012, el Decreto 1377 de 2013 y demás normas que las modifiquen, con la finalidad de gestionar mi trámite de visa. Podré ejercer mis derechos de conocer, actualizar, rectificar y suprimir mis datos en cualquier momento.';
const HGW_DEFAULTS = { empresa: 'HGW', cargo: 'Distribuidor Independiente', mesInicio: 'ENE', anioInicio: '2020', actual: true, direccion: 'CL 119 #14-42', telefono: '(+57) 777 77 77', supervisor: 'Nohora Santos Vigoya' };

const FIELDS: any[] = [
  {step:0,type:'text',key:'email',label:'Correo electrónico',inputType:'email',email:true,required:true},
  {step:0,type:'text',key:'nombres',label:'Nombres y apellidos completos',required:false},
  {step:0,type:'text',key:'cedula',label:'Número de cédula',numeric:true,required:true},
  {step:0,type:'text',key:'fechaNacimiento',label:'Fecha de nacimiento',inputType:'date',required:true},
  {step:0,type:'choice',key:'estadoCivil',label:'Estado civil',options:['Casado','Soltero','Viudo','Separado','Otro'],revealOn:'Otro',revealKey:'estadoCivilOtro',required:true},
  {step:0,type:'text',key:'nombreConyuge',label:'Nombre y apellido del esposo/a',required:true,showIf:(data:any)=>data.estadoCivil==='Casado'},
  {step:0,type:'text',key:'fechaNacimientoConyuge',label:'Fecha de nacimiento del esposo/a',inputType:'date',required:true,showIf:(data:any)=>data.estadoCivil==='Casado'},
  {step:0,type:'text',key:'ciudadNacimientoConyuge',label:'Ciudad de nacimiento del esposo/a',required:true,showIf:(data:any)=>data.estadoCivil==='Casado'},
  {step:0,type:'choice',key:'tieneHijos',label:'¿Tiene hijos?',options:['Sí','No'],required:true},
  {step:0,type:'text',key:'nacionalidad',label:'Nacionalidad',default:'Colombiano',required:true},
  {step:0,type:'choice',key:'otraNacionalidad',label:'¿Tiene otra nacionalidad?',options:['Sí','No'],revealOn:'Sí',revealKey:'otraNacionalidadCual',revealLabel:'¿Cuál?',required:true},
  {step:0,type:'choice',key:'educacion',label:'Nivel más alto de educación',options:['Escuela secundaria','Pregrado','Posgrado','Doctorado','Otro'],revealOn:'Otro',revealKey:'educacionOtro',required:true},
  {step:0,type:'text',key:'institucion',label:'Institución donde se graduó',required:true},

  {step:1,type:'text',key:'direccion',label:'Dirección de residencia actual',required:true},
  {step:1,type:'text',key:'telefono',label:'Número de teléfono',inputType:'tel',numeric:true,required:true},
  {step:1,type:'text',key:'padreNombre',label:'Nombre y apellido del padre',shortLabel:'Nombre y apellido',required:true},
  {step:1,type:'text',key:'padreNacionalidad',label:'Nacionalidad del padre',shortLabel:'Nacionalidad',placeholder:'Ej. Colombiana',required:true},
  {step:1,type:'text',key:'padreFecha',label:'Fecha de nacimiento del padre',shortLabel:'Fecha de nacimiento',inputType:'date',required:true},
  {step:1,type:'text',key:'madreNombre',label:'Nombre y apellido de la madre',shortLabel:'Nombre y apellido',required:true},
  {step:1,type:'text',key:'madreNacionalidad',label:'Nacionalidad de la madre',shortLabel:'Nacionalidad',placeholder:'Ej. Colombiana',required:true},
  {step:1,type:'text',key:'madreFecha',label:'Fecha de nacimiento de la madre',shortLabel:'Fecha de nacimiento',inputType:'date',required:true},

  {step:2,type:'choice',key:'parientesChina',label:'¿Tiene parientes (aparte de sus padres) en China?',options:['Sí','No'],required:true},
  {step:2,type:'text',key:'contactoNombre',label:'Nombre y apellido del contacto de emergencia',required:true},
  {step:2,type:'text',key:'contactoParentesco',label:'Parentesco del contacto de emergencia',required:true},
  {step:2,type:'text',key:'contactoTelefono',label:'Teléfono del contacto de emergencia',inputType:'tel',numeric:true,required:true},
  {step:2,type:'text',key:'contactoCorreo',label:'Correo del contacto de emergencia',inputType:'email',email:true,required:true},
  {step:2,type:'choice',key:'quienPaga',label:'¿Quién pagará el viaje?',options:['Yo','Empresa','Otro'],revealOn:'Otro',revealKey:'quienPagaOtro',required:true},
  {step:2,type:'choice',key:'haEstadoChina',label:'¿Alguna vez ha estado en China?',options:['Sí','No'],revealOn:'Sí',revealKey:'haEstadoChinaFechas',revealLabel:'¿En qué fechas?',revealMonthYearList:true,required:true},

  {step:3,type:'choice',key:'otrasVisasVigentes',label:'¿Posee alguna visa válida emitida por otros países?',options:['Sí','No'],revealOn:'Sí',revealKey:'otrasVisasVigentesPaises',revealLabel:'Escribe un país y presiona Enter',revealCountries:true,required:true},
  {step:3,type:'choice',key:'visaNegada',label:'¿Alguna vez le han negado la visa a China?',options:['Sí','No'],required:true},
  {step:3,type:'choice',key:'ingresoIlegal',label:'¿Ha ingresado a China ilegalmente, o permanecido/trabajado sin permiso?',options:['Sí','No'],required:true},
  {step:3,type:'choice',key:'antecedentesPenales',label:'¿Tiene antecedentes penales en China o en otro país?',options:['Sí','No'],required:true},
  {step:3,type:'choice',key:'epidemias',label:'¿Ha visitado zonas con alguna epidemia en los últimos 30 días?',options:['Sí','No'],required:true},
  {step:3,type:'choice',key:'formacionArmas',label:'¿Tiene formación en armas, explosivos o productos biológicos/químicos?',options:['Sí','No'],required:true},
  {step:3,type:'choice',key:'servicioMilitar',label:'¿Está sirviendo o ha servido en el ejército?',options:['Sí','No'],required:true},
  {step:3,type:'choice',key:'paramilitar',label:'¿Ha participado en organizaciones paramilitares o fuerzas armadas irregulares?',options:['Sí','No'],required:true},
  {step:3,type:'choice',key:'organizacionBenefica',label:'¿Trabaja para alguna organización profesional, social o benéfica?',options:['Sí','No'],required:true},
  {step:3,type:'text',key:'declaracionAdicional',label:'¿Hay algo más que quieras declarar?',textarea:true,required:true},


  {step:4,type:'choice',key:'ocupacion',label:'Ocupación',options:['Empresario','Jubilado','Empleado de empresa','Artista','Estudiante','Personal militar','Trabajador por cuenta propia','Otro','HGW'],revealOn:'Otro',revealKey:'ocupacionOtro',required:true},
  {step:4,type:'choice',key:'visaChinaAprobada',label:'¿Le han aprobado alguna vez la visa a China?',options:['Sí','No'],revealOn:'Sí',revealKey:'lugarEmisionVisa',revealLabel:'Lugar de emisión',required:true},
];


type Data = Record<string, any>;

function defaultData(): Data {
  const d: Data = {};
  FIELDS.forEach((f) => {
    if (f.type === "choice" && f.options.includes("No")) d[f.key] = "No";
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

const inputStyle = (invalid: boolean): React.CSSProperties => ({
  padding: "11px 13px",
  borderRadius: 10,
  border: invalid ? BORDER_ERR : BORDER,
  background: "#fff",
  fontSize: 14,
  height: 42,
  width: "100%",
  color: INK,
  fontFamily: "inherit",
  boxSizing: "border-box",
});

const selectStyle = (invalid: boolean): React.CSSProperties => ({
  ...inputStyle(invalid),
  padding: "0 10px",
});

function Label({ children, invalid }: { children: React.ReactNode; invalid?: boolean }) {
  return (
    <label style={{ fontSize: 12.5, fontWeight: 700, color: invalid ? TERRA : INK }}>{children}</label>
  );
}

function ErrText({ children = "Campo obligatorio" }: { children?: React.ReactNode }) {
  return <span style={{ fontSize: 11.5, color: TERRA }}>{children}</span>;
}

function Pill({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "8px 16px",
        borderRadius: 999,
        border: "1.5px solid " + (selected ? TEAL : "rgba(58,44,34,.2)"),
        background: selected ? TEAL : "#fff",
        color: selected ? "#fdf7ec" : INK,
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "inherit",
      }}
    >
      {label}
    </button>
  );
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 10px 8px 14px",
        borderRadius: 999,
        background: TEAL,
        color: "#fdf7ec",
        fontSize: 13,
        fontWeight: 600,
      }}
    >
      <span>{label}</span>
      <button
        type="button"
        onClick={onRemove}
        aria-label={"Quitar " + label}
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          border: "none",
          background: "rgba(253,247,236,.2)",
          color: "#fdf7ec",
          fontSize: 12,
          lineHeight: 1,
          cursor: "pointer",
        }}
      >
        ✕
      </button>
    </div>
  );
}

const EMPTY_EXP = {
  empresa: "",
  cargo: "",
  mesInicio: "",
  anioInicio: "",
  mesFin: "",
  anioFin: "",
  actual: false,
  direccion: "",
  telefono: "",
  supervisor: "",
};

export default function FormularioVisaChina() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>(defaultData);
  const [showError, setShowError] = useState(false);
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeSuggest, setActiveSuggest] = useState<string | null>(null);

  const years = useMemo(() => yearsList(), []);
  const deptos = useMemo(() => deptoKeysBogotaFirst(), []);

  const setField = (key: string, val: any) => {
    setShowError(false);
    setData((prev) => {
      const next: Data = { ...prev, [key]: val };
      if (key === "ocupacion" && (val === "Empleado de empresa" || val === "HGW")) {
        const cur = prev.experienciasList || [];
        if (!cur.length) {
          next.experienciasList = [val === "HGW" ? { ...HGW_DEFAULTS } : { ...EMPTY_EXP }];
        } else if (val === "HGW") {
          const first = cur[0];
          const firstEmpty =
            !first.empresa && !first.cargo && !first.direccion && !first.telefono && !first.supervisor;
          if (firstEmpty) next.experienciasList = [{ ...first, ...HGW_DEFAULTS }, ...cur.slice(1)];
        }
      }
      if (key === "haEstadoChina" && val === "Sí" && !(prev.haEstadoChinaFechas || []).length) {
        next.haEstadoChinaFechas = [{ mes: "", anio: "" }];
      }
      if (key === "tieneHijos" && val === "Sí" && !(prev.hijosList || []).length) {
        next.hijosList = [{ nombre: "", fecha: "", nacionalidad: "" }];
      }
      return next;
    });
  };

  const patchList = (key: string, fn: (list: any[]) => any[]) => {
    setShowError(false);
    setData((prev) => ({ ...prev, [key]: fn(prev[key] || []) }));
  };

  const visibleFields = (s: number) =>
    FIELDS.filter((f) => f.step === s && (!f.showIf || f.showIf(data)));

  const revealIncomplete = (f: any) => {
    if (!f.revealOn || data[f.key] !== f.revealOn) return false;
    if (f.revealMonthYearList) {
      const list = data[f.revealKey] || [];
      return !list.length || list.some((v: any) => !v.mes || !v.anio);
    }
    if (f.revealCountries) return !(data[f.revealKey] || []).length;
    return !data[f.revealKey] || !String(data[f.revealKey]).trim();
  };

  const fieldInvalid = (f: any) =>
    !!f.required && (!data[f.key] || !String(data[f.key]).trim() || revealIncomplete(f));

  const isStepValid = (s: number) => {
    if (visibleFields(s).some((f) => fieldInvalid(f))) return false;
    if (s === 0) {
      if (!data.paisNacimiento || !data.departamentoNacimiento || !data.ciudadNacimiento) return false;
      if (data.tieneHijos === "Sí") {
        const list = data.hijosList || [];
        if (!list.length) return false;
        if (list.some((h: any) => !h.nombre || !String(h.nombre).trim() || !h.fecha)) return false;
      }
    }
    if (s === 1) {
      if (!data.paisResidencia || !data.departamentoResidencia || !data.ciudadResidencia) return false;
    }
    if (s === 4) {
      if (!(data.paisesVisitadosList || []).length) return false;
      if (data.ocupacion === "Empleado de empresa" || data.ocupacion === "HGW") {
        const list = data.experienciasList || [];
        if (!list.length) return false;
        if (
          list.some(
            (e: any) =>
              !e.empresa ||
              !e.cargo ||
              !e.mesInicio ||
              !e.anioInicio ||
              (!e.actual && (!e.mesFin || !e.anioFin)) ||
              !e.direccion ||
              !e.telefono ||
              !e.supervisor
          )
        )
          return false;
      }
    }
    return true;
  };

  const goNext = () => {
    if (!isStepValid(step)) {
      setShowError(true);
      return;
    }
    setShowError(false);
    setStep((s) => Math.min(5, s + 1));
    window.scrollTo(0, 0);
  };
  const goBack = () => {
    setShowError(false);
    setStep((s) => Math.max(0, s - 1));
    window.scrollTo(0, 0);
  };

  const buildOrderedPayload = () => {
    const out: Record<string, string> = {};
    out["Fecha de envío"] = new Date().toISOString();
    FIELDS.forEach((f) => {
      const val = data[f.key] || "";
      if (
        f.key === "nombreConyuge" ||
        f.key === "fechaNacimientoConyuge" ||
        f.key === "ciudadNacimientoConyuge" ||
        f.key === "tieneHijos"
      )
        return;
      out[f.label] = val;
      if (f.revealKey) {
        const revLabel = f.label + " — " + (f.revealLabel || "detalle");
        const active = f.revealOn && val === f.revealOn;
        out[revLabel] = !active
          ? ""
          : f.revealMonthYearList
          ? (data[f.revealKey] || []).map((v: any) => v.mes + " " + v.anio).join(", ")
          : f.revealCountries
          ? (data[f.revealKey] || []).join(", ")
          : data[f.revealKey] || "";
      }
      if (f.key === "direccion") {
        out["País de residencia"] = data.paisResidencia || "";
        out["Departamento / Estado de residencia"] = data.departamentoResidencia || "";
        out["Ciudad de residencia"] = data.ciudadResidencia || "";
      }
      if (f.key === "fechaNacimiento") {
        out["País de nacimiento"] = data.paisNacimiento || "";
        out["Departamento / Estado de nacimiento"] = data.departamentoNacimiento || "";
        out["Ciudad de nacimiento"] = data.ciudadNacimiento || "";
      }
      if (f.key === "estadoCivil") {
        out["¿Tiene hijos?"] = data.tieneHijos || "";
      }
    });
    out["Países visitados en los últimos 2 años"] = (data.paisesVisitadosList || []).join(", ");
    const exps = data.experienciasList || [];
    for (let i = 0; i < 5; i++) {
      const e = exps[i];
      const n = i + 1;
      const fechas = e
        ? e.actual
          ? e.mesInicio + " " + e.anioInicio + " – Actualmente"
          : e.mesInicio + " " + e.anioInicio + " – " + e.mesFin + " " + e.anioFin
        : "";
      out["Experiencia " + n + " — Empresa"] = e ? e.empresa || "" : "";
      out["Experiencia " + n + " — Cargo"] = e ? e.cargo || "" : "";
      out["Experiencia " + n + " — Fechas"] = fechas.trim();
      out["Experiencia " + n + " — Dirección"] = e ? e.direccion || "" : "";
      out["Experiencia " + n + " — Teléfono"] = e ? e.telefono || "" : "";
      out["Experiencia " + n + " — Supervisor"] = e ? e.supervisor || "" : "";
    }
    const hijos = data.hijosList || [];
    for (let i = 0; i < 6; i++) {
      const h = hijos[i];
      const n = i + 1;
      out["Hijo " + n + " — Nombre"] = h ? h.nombre || "" : "";
      out["Hijo " + n + " — Nacionalidad"] = h ? h.nacionalidad || "" : "";
      out["Hijo " + n + " — Fecha de nacimiento"] = h ? h.fecha || "" : "";
    }
    out["NombreEspos@"] = data.nombreConyuge || "";
    out["FechaNacimientoEspos@"] = data.fechaNacimientoConyuge || "";
    out["CiudadEspos@"] = data.ciudadNacimientoConyuge || "";
    out["Autorizacion?"] = consent ? "Sí" : "No";
    out["TextoAutorizacion"] = consent ? CONSENT_TEXT : "";
    out["DispositivoAutorizacion"] =
      typeof navigator !== "undefined" ? navigator.userAgent : "";
    return out;
  };

  const submitForm = () => {
    if (!consent) {
      setConsentError(true);
      return;
    }
    setSubmitting(true);
    const payload = buildOrderedPayload();
    const done = () => {
      setSubmitting(false);
      setSubmitted(true);
      window.scrollTo(0, 0);
    };
    if (!SHEETS_WEBHOOK_URL) {
      done();
      return;
    }
    // XMLHttpRequest (no fetch): /exec responde con un 302 y fetch en modo no-cors
    // convierte el POST en GET, perdiendo el cuerpo. XHR conserva el método.
    try {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", SHEETS_WEBHOOK_URL, true);
      xhr.setRequestHeader("Content-Type", "text/plain;charset=utf-8");
      xhr.onload = done;
      xhr.onerror = done;
      xhr.send(JSON.stringify(payload));
    } catch {
      done();
    }
  };

  /* ---------- renderers ---------- */

  const renderField = (f: any) => {
    const invalid = showError && fieldInvalid(f);
    const label = (f.shortLabel || f.label) + (f.required ? " *" : "");

    if (f.type === "choice") {
      return (
        <div key={f.key} style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: 6 }}>
          <Label invalid={invalid}>{label}</Label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {f.options.map((o: string) => (
              <Pill key={o} label={o} selected={data[f.key] === o} onClick={() => setField(f.key, o)} />
            ))}
          </div>
          {f.revealOn && data[f.key] === f.revealOn && renderReveal(f, invalid)}
          {invalid && <ErrText />}
        </div>
      );
    }

    const isTextarea = !!f.textarea;
    return (
      <div
        key={f.key}
        style={{
          gridColumn: isTextarea ? "1 / -1" : "auto",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          position: "relative",
        }}
      >
        <Label invalid={invalid}>{label}</Label>
        {isTextarea ? (
          <textarea
            rows={3}
            value={data[f.key] || ""}
            placeholder={f.placeholder || ""}
            onChange={(e) => setField(f.key, e.target.value)}
            style={{ ...inputStyle(invalid), height: "auto", resize: "vertical" }}
          />
        ) : (
          <>
            <input
              type={f.inputType || "text"}
              inputMode={f.numeric ? "numeric" : undefined}
              value={data[f.key] || ""}
              placeholder={f.placeholder || ""}
              onFocus={() => f.email && setActiveSuggest(f.key)}
              onBlur={() => setTimeout(() => setActiveSuggest((k) => (k === f.key ? null : k)), 150)}
              onChange={(e) =>
                setField(f.key, f.numeric ? e.target.value.replace(/[^0-9]/g, "") : e.target.value)
              }
              style={inputStyle(invalid)}
            />
            {f.email && activeSuggest === f.key && emailSuggestions(data[f.key] || "").length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 4px)",
                  left: 0,
                  right: 0,
                  background: "#fff",
                  border: "1px solid rgba(58,44,34,.15)",
                  borderRadius: 10,
                  boxShadow: "0 8px 24px rgba(58,44,34,.14)",
                  zIndex: 30,
                  overflow: "hidden",
                }}
              >
                {emailSuggestions(data[f.key] || "").map((opt) => (
                  <div
                    key={opt}
                    onMouseDown={() => {
                      setField(f.key, opt);
                      setActiveSuggest(null);
                    }}
                    style={{
                      padding: "10px 13px",
                      fontSize: 13.5,
                      cursor: "pointer",
                      borderBottom: "1px solid rgba(58,44,34,.06)",
                    }}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        {invalid && <ErrText />}
      </div>
    );
  };

  const renderReveal = (f: any, invalid: boolean) => {
    const capt = (
      <div
        style={{
          fontSize: 11.5,
          fontWeight: 700,
          color: "#6b5c4a",
          marginBottom: 4,
          textTransform: "uppercase",
          letterSpacing: ".02em",
        }}
      >
        {f.revealLabel || "Especifica cuál"}
      </div>
    );

    if (f.revealMonthYearList) {
      const list = data[f.revealKey] || [];
      return (
        <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 8 }}>
          {capt}
          {list.map((row: any, i: number) => (
            <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <select
                value={row.mes}
                onChange={(e) =>
                  patchList(f.revealKey, (l) => l.map((v, j) => (j === i ? { ...v, mes: e.target.value } : v)))
                }
                style={selectStyle(invalid && !row.mes)}
              >
                <option value="">Mes</option>
                {MONTHS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <select
                value={row.anio}
                onChange={(e) =>
                  patchList(f.revealKey, (l) => l.map((v, j) => (j === i ? { ...v, anio: e.target.value } : v)))
                }
                style={selectStyle(invalid && !row.anio)}
              >
                <option value="">Año</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <button
                type="button"
                aria-label="Quitar fecha"
                onClick={() => patchList(f.revealKey, (l) => l.filter((_, j) => j !== i))}
                style={{
                  width: 32,
                  height: 32,
                  flexShrink: 0,
                  borderRadius: "50%",
                  border: "none",
                  background: "rgba(58,44,34,.12)",
                  color: INK,
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>
          ))}
          {list.length < 6 && (
            <button
              type="button"
              onClick={() => patchList(f.revealKey, (l) => [...l, { mes: "", anio: "" }])}
              style={{
                alignSelf: "flex-start",
                padding: "7px 16px",
                borderRadius: 10,
                border: "1.5px solid " + TEAL,
                background: "transparent",
                color: TEAL,
                fontSize: 12.5,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              + Agregar fecha
            </button>
          )}
        </div>
      );
    }

    if (f.revealCountries) {
      const list: string[] = data[f.revealKey] || [];
      return (
        <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {list.map((c) => (
              <Chip
                key={c}
                label={c}
                onRemove={() => patchList(f.revealKey, (l) => l.filter((x) => x !== c))}
              />
            ))}
          </div>
          <select
            value=""
            onChange={(e) => {
              const v = e.target.value;
              if (v) patchList(f.revealKey, (l) => (l.includes(v) ? l : [...l, v]));
            }}
            style={selectStyle(invalid && !list.length)}
          >
            <option value="">+ Agregar país…</option>
            {WORLD_COUNTRIES.filter((c: string) => !list.includes(c)).map((c: string) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      );
    }

    return (
      <div style={{ marginTop: 6 }}>
        {capt}
        <input
          type={f.revealInputType || "text"}
          value={data[f.revealKey] || ""}
          placeholder={f.revealLabel || "Especifica cuál"}
          onChange={(e) => setField(f.revealKey, e.target.value)}
          style={inputStyle(invalid && !data[f.revealKey])}
        />
      </div>
    );
  };

  const geoBlock = (scope: "Nacimiento" | "Residencia") => {
    const paisKey = "pais" + scope;
    const depKey = "departamento" + scope;
    const ciuKey = "ciudad" + scope;
    const isCol = data[paisKey] === "Colombia";
    const cities = isCol ? COLOMBIA_GEO[data[depKey]] || [] : [];
    const inv = (v: any) => showError && !v;
    const suffix = scope === "Nacimiento" ? "de nacimiento" : "de residencia";
    return (
      <>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <Label invalid={inv(data[paisKey])}>{"País " + suffix + " *"}</Label>
          <select
            value={data[paisKey] || ""}
            onChange={(e) => {
              setField(paisKey, e.target.value);
              setField(depKey, "");
              setField(ciuKey, "");
            }}
            style={selectStyle(inv(data[paisKey]))}
          >
            <option value="">Selecciona…</option>
            {COUNTRIES.map((c: string) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <Label invalid={inv(data[depKey])}>{"Departamento / Estado " + suffix + " *"}</Label>
          {isCol ? (
            <select
              value={data[depKey] || ""}
              onChange={(e) => {
                setField(depKey, e.target.value);
                setField(ciuKey, "");
              }}
              style={selectStyle(inv(data[depKey]))}
            >
              <option value="">Selecciona…</option>
              {deptos.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          ) : (
            <input
              value={data[depKey] || ""}
              onChange={(e) => setField(depKey, e.target.value)}
              style={inputStyle(inv(data[depKey]))}
            />
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <Label invalid={inv(data[ciuKey])}>{"Ciudad " + suffix + " *"}</Label>
          {isCol ? (
            <select
              value={data[ciuKey] || ""}
              onChange={(e) => setField(ciuKey, e.target.value)}
              disabled={!data[depKey]}
              style={selectStyle(inv(data[ciuKey]))}
            >
              <option value="">{data[depKey] ? "Selecciona…" : "Elige departamento"}</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          ) : (
            <input
              value={data[ciuKey] || ""}
              onChange={(e) => setField(ciuKey, e.target.value)}
              style={inputStyle(inv(data[ciuKey]))}
            />
          )}
        </div>
      </>
    );
  };

  const groupStyle: React.CSSProperties = {
    background: CREAM,
    borderRadius: 14,
    padding: "18px 20px",
    marginBottom: 16,
  };
  const groupTitle: React.CSSProperties = {
    fontFamily: "'Marcellus', serif",
    fontSize: 14.5,
    color: TERRA,
    letterSpacing: ".06em",
    marginBottom: 14,
  };
  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
    gap: 16,
  };

  const hijosBlock = () => {
    const list = data.hijosList || [];
    return (
      <div style={{ ...groupStyle, marginTop: 16 }}>
        <div style={groupTitle}>HIJOS</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {list.map((h: any, i: number) => (
            <div key={i} style={{ ...gridStyle, position: "relative" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <Label invalid={showError && !h.nombre}>Nombre y apellido *</Label>
                <input
                  value={h.nombre || ""}
                  onChange={(e) =>
                    patchList("hijosList", (l) => l.map((x, j) => (j === i ? { ...x, nombre: e.target.value } : x)))
                  }
                  style={inputStyle(showError && !h.nombre)}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <Label invalid={showError && !h.fecha}>Fecha de nacimiento *</Label>
                <input
                  type="date"
                  value={h.fecha || ""}
                  onChange={(e) =>
                    patchList("hijosList", (l) => l.map((x, j) => (j === i ? { ...x, fecha: e.target.value } : x)))
                  }
                  style={inputStyle(showError && !h.fecha)}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <Label>Nacionalidad</Label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    value={h.nacionalidad || ""}
                    onChange={(e) =>
                      patchList("hijosList", (l) =>
                        l.map((x, j) => (j === i ? { ...x, nacionalidad: e.target.value } : x))
                      )
                    }
                    style={inputStyle(false)}
                  />
                  <button
                    type="button"
                    aria-label="Quitar hijo"
                    onClick={() => patchList("hijosList", (l) => l.filter((_, j) => j !== i))}
                    style={{
                      width: 42,
                      height: 42,
                      flexShrink: 0,
                      borderRadius: 10,
                      border: "none",
                      background: "rgba(58,44,34,.12)",
                      color: INK,
                      cursor: "pointer",
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))}
          {list.length < 6 && (
            <button
              type="button"
              onClick={() => patchList("hijosList", (l) => [...l, { nombre: "", fecha: "", nacionalidad: "" }])}
              style={{
                alignSelf: "flex-start",
                padding: "9px 18px",
                borderRadius: 10,
                border: "1.5px solid " + TEAL,
                background: "transparent",
                color: TEAL,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              + Agregar hijo
            </button>
          )}
        </div>
      </div>
    );
  };

  const experienciasBlock = () => {
    const list = data.experienciasList || [];
    const upd = (i: number, key: string, val: any) =>
      patchList("experienciasList", (l) => l.map((e, j) => (j === i ? { ...e, [key]: val } : e)));
    return (
      <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 14 }}>
        {list.map((e: any, i: number) => (
          <div key={i} style={{ ...groupStyle, marginBottom: 0, position: "relative" }}>
            <button
              type="button"
              aria-label="Quitar experiencia"
              onClick={() => patchList("experienciasList", (l) => l.filter((_, j) => j !== i))}
              style={{
                position: "absolute",
                top: 14,
                right: 16,
                width: 24,
                height: 24,
                borderRadius: "50%",
                border: "none",
                background: "rgba(58,44,34,.12)",
                color: INK,
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              ✕
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ ...groupTitle, marginBottom: 0 }}>EXPERIENCIA {i + 1}</div>
              <button
                type="button"
                onClick={() => patchList("experienciasList", (l) => l.map((x, j) => (j === i ? { ...x, ...HGW_DEFAULTS } : x)))}
                style={{
                  padding: "5px 14px",
                  borderRadius: 999,
                  border: "1.5px solid " + TEAL,
                  background: "#fff",
                  color: TEAL,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                HGW
              </button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14 }}>
              {[
                ["empresa", "Empresa"],
                ["cargo", "Cargo"],
                ["direccion", "Dirección de la empresa"],
                ["telefono", "Teléfono de la empresa"],
                ["supervisor", "Nombre del supervisor"],
              ].map(([key, label]) => (
                <div key={key} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <Label invalid={showError && !e[key]}>{label + " *"}</Label>
                  <input
                    value={e[key] || ""}
                    onChange={(ev) => upd(i, key, ev.target.value)}
                    style={inputStyle(showError && !e[key])}
                  />
                </div>
              ))}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <Label invalid={showError && !e.mesInicio}>Desde *</Label>
                <div style={{ display: "flex", gap: 8 }}>
                  <select value={e.mesInicio || ""} onChange={(ev) => upd(i, "mesInicio", ev.target.value)} style={selectStyle(showError && !e.mesInicio)}>
                    <option value="">Mes</option>
                    {MONTHS.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <select value={e.anioInicio || ""} onChange={(ev) => upd(i, "anioInicio", ev.target.value)} style={selectStyle(showError && !e.anioInicio)}>
                    <option value="">Año</option>
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <Label invalid={showError && !e.actual && !e.mesFin}>Hasta</Label>
                <div style={{ display: "flex", gap: 8 }}>
                  <select
                    value={e.mesFin || ""}
                    disabled={!!e.actual}
                    onChange={(ev) => upd(i, "mesFin", ev.target.value)}
                    style={{ ...selectStyle(showError && !e.actual && !e.mesFin), background: e.actual ? "#efe6d6" : "#fff" }}
                  >
                    <option value="">Mes</option>
                    {MONTHS.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <select
                    value={e.anioFin || ""}
                    disabled={!!e.actual}
                    onChange={(ev) => upd(i, "anioFin", ev.target.value)}
                    style={{ ...selectStyle(showError && !e.actual && !e.anioFin), background: e.actual ? "#efe6d6" : "#fff" }}
                  >
                    <option value="">Año</option>
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
                <label style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12.5, color: INK, cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={!!e.actual}
                    onChange={() => {
                      const cur = currentMonthYear();
                      patchList("experienciasList", (l) =>
                        l.map((x, j) =>
                          j === i
                            ? {
                                ...x,
                                actual: !x.actual,
                                mesFin: !x.actual ? cur.mes : x.mesFin,
                                anioFin: !x.actual ? cur.anio : x.anioFin,
                              }
                            : x
                        )
                      );
                    }}
                    style={{ width: 15, height: 15 }}
                  />
                  Actualmente
                </label>
              </div>
            </div>
          </div>
        ))}
        {showError && !list.length && <ErrText>Agrega al menos una experiencia laboral</ErrText>}
        {list.length < 5 && (
          <button
            type="button"
            onClick={() => patchList("experienciasList", (l) => [...l, { ...EMPTY_EXP }])}
            style={{
              alignSelf: "flex-start",
              padding: "10px 20px",
              borderRadius: 10,
              border: "1.5px solid " + TEAL,
              background: "transparent",
              color: TEAL,
              fontSize: 13.5,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            + Agregar experiencia laboral
          </button>
        )}
      </div>
    );
  };

  const paisesVisitadosBlock = () => {
    const list: string[] = data.paisesVisitadosList || [];
    const invalid = showError && !list.length;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 22 }}>
        <Label invalid={invalid}>Países visitados en los últimos 2 años *</Label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {list.map((c) => (
            <Chip key={c} label={c} onRemove={() => patchList("paisesVisitadosList", (l) => l.filter((x) => x !== c))} />
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <select
            value=""
            onChange={(e) => {
              const v = e.target.value;
              if (v) patchList("paisesVisitadosList", (l) => (l.includes(v) ? l : [...l, v]));
            }}
            style={selectStyle(invalid)}
          >
            <option value="">+ Agregar país…</option>
            {WORLD_COUNTRIES.filter((c: string) => !list.includes(c)).map((c: string) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setField("paisesVisitadosList", ["Ninguno"])}
            style={{
              padding: "0 16px",
              borderRadius: 10,
              border: "1.5px solid rgba(58,44,34,.2)",
              background: "#fff",
              color: INK,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Ninguno
          </button>
        </div>
        {invalid && <ErrText>Agrega al menos un país</ErrText>}
      </div>
    );
  };

  const reviewRows = () => {
    const payload = buildOrderedPayload();
    return Object.entries(payload).filter(
      ([k, v]) => v && k !== "DispositivoAutorizacion" && k !== "TextoAutorizacion"
    );
  };

  const STEP_LABELS = ["Datos", "Familia", "Emergencia", "Antecedentes", "Ocupación", "Revisión"];
  const stepHeads = [
    ["Datos personales", "Tal como aparecen en tu pasaporte."],
    ["Contacto y familia", "Necesitamos estos datos para el formulario consular."],
    [
      "Contacto de emergencia",
      "Una persona de confianza a quien podamos llamar si ocurre algo durante tu viaje. No tiene que estar en China: puede ser tu mamá, papá, pareja, hermano/a o un amigo cercano.",
    ],
    ["Antecedentes y seguridad", "Preguntas obligatorias del consulado chino. Responde con sinceridad."],
    ["Ocupación y viaje", "Últimos datos antes de revisar tu formulario."],
    ["Revisa y envía", "Verifica tus respuestas antes de enviar tu formulario."],
  ];

  return (
    <div style={{ minHeight: "100vh", background: CREAM, color: INK, fontFamily: "'Karla', system-ui, sans-serif", padding: "clamp(20px,5vw,56px) 16px", display: "flex", justifyContent: "center" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Marcellus&family=Karla:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <div style={{ width: "100%", maxWidth: 760 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontFamily: "'Marcellus', serif", fontSize: 13, letterSpacing: ".3em", color: TERRA, marginBottom: 8 }}>
            WONDERLUST · TRÁMITE DE VISA
          </div>
          <h1 style={{ fontFamily: "'Marcellus', serif", fontSize: "clamp(26px,4vw,36px)", margin: 0, color: TEAL, fontWeight: 400 }}>
            Formulario Visa China
          </h1>
          <p style={{ fontSize: 14.5, color: MUTED, margin: "10px auto 0", maxWidth: 480, lineHeight: 1.55 }}>
            Completa tus datos con calma — puedes ir y volver entre pasos. Al final tu formulario queda registrado con
            nosotros para iniciar tu trámite.
          </p>
        </div>

        {!submitted && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 26 }}>
              {STEP_LABELS.map((l, i) => (
                <div
                  key={l}
                  onClick={() => i < step && setStep(i)}
                  style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: i < step ? "pointer" : "default" }}
                >
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      fontWeight: 700,
                      border: "1.5px solid " + TEAL,
                      background: i <= step ? TEAL : CARD,
                      color: i <= step ? "#fdf7ec" : TEAL,
                    }}
                  >
                    {i + 1}
                  </div>
                  <div style={{ fontSize: 10, letterSpacing: ".04em", color: i === step ? TEAL : "#9a8a76", textAlign: "center", textTransform: "uppercase" }}>
                    {l}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ height: 3, background: "rgba(58,44,34,.1)", borderRadius: 2, marginBottom: 30, overflow: "hidden" }}>
              <div style={{ height: "100%", background: TERRA, borderRadius: 2, transition: "width .35s ease", width: (step / 5) * 100 + "%" }} />
            </div>
          </>
        )}

        <div style={{ background: CARD, borderRadius: 20, padding: "clamp(22px,4vw,38px)", boxShadow: "0 10px 40px rgba(58,44,34,.08)", border: "1px solid rgba(58,44,34,.07)" }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "30px 10px" }}>
              <div style={{ width: 62, height: 62, borderRadius: "50%", border: "2px solid " + TEAL, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", transform: "rotate(-8deg)" }}>
                <span style={{ fontFamily: "'Marcellus', serif", fontSize: 26, color: TEAL, transform: "rotate(8deg)" }}>✓</span>
              </div>
              <div style={{ fontFamily: "'Marcellus', serif", fontSize: 22, color: TEAL, marginBottom: 10 }}>¡Formulario recibido!</div>
              <div style={{ fontSize: 14, color: MUTED, lineHeight: 1.6, maxWidth: 420, margin: "0 auto" }}>
                Ya guardamos tus datos de forma privada. Nuestro equipo se pondrá en contacto contigo para continuar con tu
                trámite de Visa China.
              </div>
            </div>
          ) : (
            <>
              <div style={{ fontFamily: "'Marcellus', serif", fontSize: 19, color: TEAL, marginBottom: 4 }}>{stepHeads[step][0]}</div>
              <div style={{ fontSize: 13, color: MUTED, marginBottom: 22 }}>{stepHeads[step][1]}</div>

              {step === 0 && (
                <>
                  <div style={gridStyle}>
                    {visibleFields(0).slice(0, 4).map(renderField)}
                    {geoBlock("Nacimiento")}
                    {visibleFields(0).slice(4).map(renderField)}
                  </div>
                  {data.tieneHijos === "Sí" && hijosBlock()}
                </>
              )}

              {step === 1 && (
                <>
                  <div style={{ ...gridStyle, marginBottom: 22 }}>
                    {visibleFields(1)
                      .filter((f) => !f.key.startsWith("padre") && !f.key.startsWith("madre"))
                      .map(renderField)}
                    {geoBlock("Residencia")}
                  </div>
                  <div style={groupStyle}>
                    <div style={groupTitle}>DATOS DEL PADRE</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14 }}>
                      {visibleFields(1).filter((f) => f.key.startsWith("padre")).map(renderField)}
                    </div>
                  </div>
                  <div style={{ ...groupStyle, marginBottom: 0 }}>
                    <div style={groupTitle}>DATOS DE LA MADRE</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14 }}>
                      {visibleFields(1).filter((f) => f.key.startsWith("madre")).map(renderField)}
                    </div>
                  </div>
                </>
              )}

              {(step === 2 || step === 3) && <div style={gridStyle}>{visibleFields(step).map(renderField)}</div>}

              {step === 4 && (
                <>
                  {paisesVisitadosBlock()}
                  <div style={gridStyle}>{visibleFields(4).filter((f) => f.key === "ocupacion").map(renderField)}</div>
                  {(data.ocupacion === "Empleado de empresa" || data.ocupacion === "HGW") && experienciasBlock()}
                  <div style={{ ...gridStyle, marginTop: 22 }}>
                    {visibleFields(4).filter((f) => f.key !== "ocupacion").map(renderField)}
                  </div>
                </>
              )}

              {step === 5 && (
                <>
                  <div style={{ background: CREAM, borderRadius: 14, padding: "16px 18px", maxHeight: 340, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
                    {reviewRows().map(([k, v]) => (
                      <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 14, fontSize: 13, borderBottom: "1px solid rgba(58,44,34,.08)", paddingBottom: 8 }}>
                        <span style={{ color: MUTED, flexShrink: 0, maxWidth: "55%" }}>{k}</span>
                        <span style={{ fontWeight: 600, textAlign: "right" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 14, alignItems: "flex-start", background: "#fff", border: "1px solid rgba(58,44,34,.14)", padding: "14px 16px", marginBottom: 22 }}>
                    <div style={{ width: 3, alignSelf: "stretch", background: "#e0a94a", flexShrink: 0 }} />
                    <div style={{ fontSize: 13, lineHeight: 1.5 }}>
                      No olvides tener a la mano la <strong>foto de tu pasaporte</strong>: te la pediremos en el siguiente
                      paso de tu trámite.
                    </div>
                  </div>
                  <label style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10, cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={() => {
                        setConsent((c) => !c);
                        setConsentError(false);
                      }}
                      style={{ width: 17, height: 17, marginTop: 1, flexShrink: 0 }}
                    />
                    <span style={{ fontSize: 12.5, lineHeight: 1.5, color: consentError ? TERRA : INK }}>{CONSENT_TEXT}</span>
                  </label>
                  {consentError && (
                    <div style={{ marginBottom: 16 }}>
                      <ErrText>Debes aceptar el tratamiento de datos para continuar</ErrText>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={submitForm}
                    disabled={submitting}
                    style={{
                      width: "100%",
                      marginTop: 12,
                      background: TEAL,
                      color: "#fdf7ec",
                      fontSize: 14,
                      fontWeight: 700,
                      letterSpacing: ".08em",
                      textTransform: "uppercase",
                      padding: 16,
                      border: "none",
                      borderRadius: "2px 14px 2px 14px",
                      cursor: submitting ? "wait" : "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    {submitting ? "Enviando…" : "Enviar formulario"}
                  </button>
                </>
              )}

              {showError && (
                <div style={{ marginTop: 16, color: TERRA, fontSize: 13, fontWeight: 600 }}>
                  Por favor completa los campos marcados con * antes de continuar.
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginTop: 28, paddingTop: 22, borderTop: "1px solid rgba(58,44,34,.08)" }}>
                {step === 0 ? (
                  <span />
                ) : (
                  <button
                    type="button"
                    onClick={goBack}
                    style={{ padding: "13px 24px", borderRadius: 10, border: "1.5px solid rgba(58,44,34,.25)", background: "transparent", color: INK, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
                  >
                    Atrás
                  </button>
                )}
                {step !== 5 && (
                  <button
                    type="button"
                    onClick={goNext}
                    style={{ padding: "13px 28px", borderRadius: "2px 12px 2px 12px", border: "none", background: TEAL, color: "#fdf7ec", fontSize: 14, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit" }}
                  >
                    Siguiente
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        <div style={{ textAlign: "center", fontSize: 12, color: "#9a8a76", marginTop: 20 }}>
          Wonderlust — Agencia de viajes · Bogotá · Tus datos solo se usan para tramitar tu visa.
        </div>
      </div>
    </div>
  );
}
