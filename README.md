# Nodejs Monggose

Descargar aplicación

```
git clone https://github.com/snkeduar/ConsissRest.git
```

construir node_modules

```
npm install
```
> Nota: debe estar dentro del directorio donde se encuentran los archivos del proyecto para que funcione el comando anterior.

# Crear base de datos
Para el proyecto se utilizó el software Studio 3T (macOs)
crear una base de datos llamada: consiss
crear colección llamada users -> documento

```
{
    "_id" : ObjectId("5c44b262589086e13d367c02"),
    "name" : "Eduardo",
    "email" : "snkeduar@gmail.com",
    "password" : "$2a$10$ZEdJ.GtVqhYyKcYi6LlqT.R61xk7tsOP1cv8XAU6sUaX9MwL2h87q"
}
```
crear colección llamada tasks -> documento

```
{
    "_id" : ObjectId("5c45866a94b50d3fe498aff7"),
    "name" : "Pruebas",
    "user" : ObjectId("5c44b262589086e13d367c02"),
    "__v" : NumberInt(0)
}
```

# Problemas

Cualquier duda contactame a: snkeduar@gmail.com
