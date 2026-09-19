# Practica_4_DMII_Alison_Saban

## 1. Resumen Ejecutivo
UMES Clima v3 es una aplicación móvil híbrida desarrollada para la plataforma Android utilizando el framework Ionic con Angular. El objetivo principal del sistema es proveer información meteorológica precisa en tiempo real basada en la ubicación geográfica exacta del dispositivo móvil, capturada mediante hardware GPS, e integrar funcionalidades nativas de captura y almacenamiento de imágenes asociadas a cada consulta.

## 2. Descripción General del Sistema
La aplicación elimina la necesidad de selección manual de regiones o ciudades por parte del usuario. Al iniciar una consulta, el sistema realiza la lectura de las coordenadas (latitud y longitud) mediante el sensor del dispositivo, consulta los servicios web REST de Open-Meteo, presenta los datos organizados en la interfaz y permite persistir el registro de forma local. Adicionalmente, ofrece la posibilidad de vincular una fotografía capturada desde la cámara a cada registro guardado, permitiendo opcionalmente almacenar dicha imagen en la galería pública del dispositivo.

## 3. Arquitectura del Software
La solución se desarrolló bajo una arquitectura limpia y desacoplada basada en componentes independientes (Standalone Components) y servicios especialidades de infraestructura:

* **Patrón de Control:** Comunicación directa entre controladores de vista (Páginas) y servicios de dominio, omitiendo capas intermedias innecesarias para mantener la simplicidad y alta mantenibilidad.
* **Gestión de Estado Reactivo:** Uso de Angular Signals (`signal`, `computed`) para administrar el estado de los registros en memoria de forma reactiva, garantizando la actualización automática de la interfaz sin requerir recargas de página.
* **Persistencia de Datos:** Implementación de almacenamiento local con `localStorage` para garantizar la persistencia de los registros climáticos y sus correspondientes imágenes codificadas en formato DataURL (Base64).
* **Servicios Especializados:**
  * `GeolocalizacionService`: Manejo nativo de coordenadas GPS.
  * `ClimaService`: Peticiones HTTP a la API REST meteorológica.
  * `NotificacionesService`: Despliegue de diálogos modales y componentes Toast.
  * `CamaraService`: Gestión de hardware de cámara y almacenamiento en galería.
  * `RegistrosService`: Administración centralizada del estado y persistencia de datos.

## 4. Tecnologías y Librerías
* **Ionic Framework:** v7+ (Componentes de interfaz de usuario).
* **Angular:** v17+ (Core del framework, Standalone Components y Signals).
* **Capacitor:** v6+ (Capa de abstracción nativa para Android).
* **TypeScript:** Lenguaje de programación principal.
* **RxJS / HttpClient:** Manejo de peticiones asíncronas HTTP convertidas a Promesas mediante `firstValueFrom`.

## 5. Plugins de Capacitor
* `@capacitor/geolocation`: Acceso a la API nativa de localización del sistema operativo.
* `@capacitor/camera`: Acceso al hardware de la cámara y gestión de permisos de almacenamiento en galería.

## 6. Configuración de Permisos en Android
Para garantizar el correcto funcionamiento en dispositivos Android, el archivo `android/app/src/main/AndroidManifest.xml` incluye la declaración explícita de los siguientes permisos:

```xml
<!-- Permisos de Red e Internet -->
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

<!-- Permisos de Geolocalización (GPS) -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" />

<!-- Permisos de Hardware de Cámara y Almacenamiento -->
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />