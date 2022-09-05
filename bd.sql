-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema SQLJudge
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `SQLJudge` ;

-- -----------------------------------------------------
-- Schema SQLJudge
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `SQLJudge` DEFAULT CHARACTER SET utf8 ;
USE `SQLJudge` ;

-- -----------------------------------------------------
-- Table `SQLJudge`.`Usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SQLJudge`.`Usuarios` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellidoP` VARCHAR(45) NOT NULL,
  `apellidoM` VARCHAR(45) NOT NULL,
  `correo` VARCHAR(45) NOT NULL,
  `usuario` VARCHAR(32) NOT NULL,
  `clave` CHAR(64) NOT NULL,
  `pais` VARCHAR(45) NULL,
  `estado` VARCHAR(45) NULL,
  `escuela` VARCHAR(45) NULL,
  `tipo` ENUM('Admin', 'Alumno') NOT NULL,
  PRIMARY KEY (`idUsuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SQLJudge`.`Categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SQLJudge`.`Categorias` (
  `idCategoria` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCategoria`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SQLJudge`.`BasesDeDatos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SQLJudge`.`BasesDeDatos` (
  `idBase` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idBase`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SQLJudge`.`Problemas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SQLJudge`.`Problemas` (
  `idProblema` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` TEXT NOT NULL,
  `solucion` TEXT NOT NULL,
  `idBase` INT NOT NULL,
  `idCategoria` INT NOT NULL,
  `dificultad` INT NOT NULL,
  `comprobarColumnas` TINYINT NOT NULL,
  PRIMARY KEY (`idProblema`),
  INDEX `fk_Problemas_Categorias1_idx` (`idCategoria` ASC) VISIBLE,
  INDEX `fk_Problemas_BasesDeDatos1_idx` (`idBase` ASC) VISIBLE,
  CONSTRAINT `fk_Problemas_Categorias1`
    FOREIGN KEY (`idCategoria`)
    REFERENCES `SQLJudge`.`Categorias` (`idCategoria`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Problemas_BasesDeDatos1`
    FOREIGN KEY (`idBase`)
    REFERENCES `SQLJudge`.`BasesDeDatos` (`idBase`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SQLJudge`.`Envios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SQLJudge`.`Envios` (
  `idEnvio` INT NOT NULL AUTO_INCREMENT,
  `idUsuario` INT NOT NULL,
  `idProblema` INT NOT NULL,
  `fecha` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `veredicto` ENUM('AC', 'WA', 'RE', 'NC', 'NR', 'RT', 'CD', 'PE') NOT NULL,
  `codigo` TEXT NOT NULL,
  `Respuesta` TEXT NOT NULL,
  PRIMARY KEY (`idEnvio`, `idUsuario`, `idProblema`),
  INDEX `fk_Usuarios_has_Problemas_Problemas1_idx` (`idProblema` ASC) VISIBLE,
  INDEX `fk_Usuarios_has_Problemas_Usuarios_idx` (`idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_Usuarios_has_Problemas_Usuarios`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `SQLJudge`.`Usuarios` (`idUsuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Usuarios_has_Problemas_Problemas1`
    FOREIGN KEY (`idProblema`)
    REFERENCES `SQLJudge`.`Problemas` (`idProblema`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SQLJudge`.`Grupos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SQLJudge`.`Grupos` (
  `idGrupo` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `docente` INT NOT NULL,
  `codigoClase` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`idGrupo`),
  INDEX `fk_Grupo_Usuarios1_idx` (`docente` ASC) VISIBLE,
  CONSTRAINT `fk_Grupo_Usuarios1`
    FOREIGN KEY (`docente`)
    REFERENCES `SQLJudge`.`Usuarios` (`idUsuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SQLJudge`.`RegistroGrupo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SQLJudge`.`RegistroGrupo` (
  `idUsuario` INT NOT NULL,
  `idGrupo` INT NOT NULL,
  PRIMARY KEY (`idUsuario`, `idGrupo`),
  INDEX `fk_Usuarios_has_Grupo_Grupo1_idx` (`idGrupo` ASC) VISIBLE,
  INDEX `fk_Usuarios_has_Grupo_Usuarios1_idx` (`idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_Usuarios_has_Grupo_Usuarios1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `SQLJudge`.`Usuarios` (`idUsuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Usuarios_has_Grupo_Grupo1`
    FOREIGN KEY (`idGrupo`)
    REFERENCES `SQLJudge`.`Grupos` (`idGrupo`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SQLJudge`.`Tareas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SQLJudge`.`Tareas` (
  `idTarea` INT NOT NULL AUTO_INCREMENT,
  `idGrupo` INT NOT NULL,
  `fechaLimite` DATETIME NOT NULL,
  `fechaAsignacion` DATETIME NOT NULL,
  PRIMARY KEY (`idTarea`),
  INDEX `fk_Tareas_Grupos1_idx` (`idGrupo` ASC) VISIBLE,
  CONSTRAINT `fk_Tareas_Grupos1`
    FOREIGN KEY (`idGrupo`)
    REFERENCES `SQLJudge`.`Grupos` (`idGrupo`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SQLJudge`.`ProblemasTareas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SQLJudge`.`ProblemasTareas` (
  `idTarea` INT NOT NULL,
  `idProblema` INT NOT NULL,
  PRIMARY KEY (`idTarea`, `idProblema`),
  INDEX `fk_Tareas_has_Problemas_Problemas1_idx` (`idProblema` ASC) VISIBLE,
  INDEX `fk_Tareas_has_Problemas_Tareas1_idx` (`idTarea` ASC) VISIBLE,
  CONSTRAINT `fk_Tareas_has_Problemas_Tareas1`
    FOREIGN KEY (`idTarea`)
    REFERENCES `SQLJudge`.`Tareas` (`idTarea`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Tareas_has_Problemas_Problemas1`
    FOREIGN KEY (`idProblema`)
    REFERENCES `SQLJudge`.`Problemas` (`idProblema`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SQLJudge`.`CodigosRegistro`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SQLJudge`.`CodigosRegistro` (
  `idCodigoRegistro` INT NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`idCodigoRegistro`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
-- begin attached script 'script'
-- Agrega datos de prueba
insert into usuarios values (null, 'Juan', 'Perez', 'Mandujano', 'asdasd@gm.com', 'S18120', SHA2('testPassword', 0), 'mexico', 'guanajuato', 'itsur', 'Admin');
insert into categorias values(null, 'Where'), (null, 'Join'), (null, 'Order by'), (null, 'Select');
insert into basesDeDatos values(null, 'world'), (null, 'nwind'), (null, 'sakila');

-- Agrega problemas
insert into problemas VALUES 
(1,'Productos mayores a 10','Seleccione todos los productos cuyo precio sea mayor a 10.','SELECT * FROM PRODUCTS WHERE UNITPRICE >10 ORDER BY 1',2,4,1,0),
(2,'Prod. categoria 1, 2, 3','SELECCIONAR LA CLAVE DEL PRODUCTO (productId), EL NOMBRE DEL PRODUCTO (productName) Y EL PRECIO (unitprice) DE LOS PRODUCTOS DE LA CATEGORÍA 1, 2 o 3 QUE TIENEN UN PRECIO DE ENTRE 10 Y 20.','SELECT PRODUCTID, PRODUCTNAME, UNITPRICE FROM PRODUCTS WHERE CATEGORYID IN (1, 2, 3) AND UNITPRICE BETWEEN 10 AND 20 ORDER BY 1, 2, 3',2,4,1,0),
(3,'Nombre que comienza con \"C\"\"\"','SELECCIONE TODOS LOS DATOS DE LOS PRODUCTOS CUYO NOMBRE (ProductName) comience con la letra \"C\"\"\"','SELECT * FROM PRODUCTS WHERE PRODUCTNAME LIKE \'C%\' ORDER BY 1',2,4,1,0),
(4,'Comienzan o terminan con \"a\"\"\"','SELECCIONE LA CLAVE DEL PRODUCTO (productId), EL NOMBRE DEL PRODUCTO (ProductName), EL PRECIO (UnitPrice) y la Categoria (CategoryId) de los productos cuyo nombre comienza o termina con la letra a','select productid, productname, unitprice, categoryid from products where productname like \'a%\' or productname like \'%a\' ORDER BY 1',2,4,1,0),
(5,'Contienen la palabra \"Queso\"\"\"','SELECCIONAR TODOS LOS DATOS DE LOS PRODUCTOS CUYO NOMBRE CONTIENE LA PALABRA \'QUESO\'','SELECT * FROM PRODUCTS WHERE PRODUCTNAME LIKE \'%QUESO%\' ORDER BY 1',2,4,1,0),
(6,'Productos que comienzan con vocal.','SELECCIONAR LA CLAVE DEL PRODUCTO, EL NOMBRE DEL PRODUCTO, EL PRECIO UNITARIO (UNITPRICE) Y LAS UNIDADES EN ALMACÉN (UnitsInStock) DE LOS PRODUCTOS QUE CUMPLAN LAS DOS SIGUIENTES CONDICIONES A) EL NOMBRE COMIENZA CON UNA VOCAL. B) EL PRECIO ES MENOR O ...','SELECT PRODUCTID, PRODUCTNAME, UNITPRICE, UNITSINSTOCK FROM PRODUCTS WHERE (PRODUCTNAME LIKE \'A%\' OR PRODUCTNAME LIKE \'E%\' OR PRODUCTNAME LIKE \'I%\' OR PRODUCTNAME LIKE \'O%\' OR PRODUCTNAME LIKE \'U%\') AND UNITPRICE <= 15 ORDER BY 1, 2, 3, 4;',2,4,1,0),
(7,'Los que cuestan mas de 31 dls.','SELECCIONAR TODOS LOS DATOS DE LOS PRODUCTOS DE LA CATEGORÍA 7, 8 & 9 que cuestan 31 dólares o más','select * from products where categoryid in (7, 8, 9) and unitprice >= 31 order by 1',2,4,1,1),
(8,'Rangos de precios','SELECCIONAR EL NOMBRE DEL PRODUCTO Y EL PRECIO DE AQUELLOS PRODUCTOS QUE TIENEN UN PRECIO DE ENTRE 5 A 10 DÓLARES O DE ENTRE 20 A 25 DÓLARES.','SELECT PRODUCTNAME, UNITPRICE FROM PRODUCTS WHERE UNITPRICE BETWEEN 5 AND 10 OR UNITPRICE BETWEEN 20 AND 25 ORDER BY 1',2,4,1,0),
(9,'Precio diferente a un rango.','SELECCIONAR TODOS LOS DATOS DE LOS PRODUCTOS QUE NO TIENEN UN PRECIO DE ENTRE 20 Y 30 DÓLARES.','SELECT * FROM PRODUCTS WHERE UNITPRICE <20 OR UNITPRICE >30 order by 1',2,4,1,0),
(10,'Todos los paises','Seleccione todos los datos de la tabla COUNTRY','Select * from country order by 1',1,4,1,0),
(11,'Países con población CERO','Seleccionar todos los datos de los paises que tienen una población (Population) mayor a cero y no tienen registrado ningún dato en la espectativa de vida (LifeExpectancy).','SELECT * FROM COUNTRY WHERE LIFEEXPECTANCY IS NULL and population > 0 order by 1',2,4,1,0),
(12,'Órdenes de dic. del 96','Seleccionar la clave de la orden, la clave del cliente, la clave del empleado de aquellas órdenes cuya fecha (orderdate) es del mes de diciembre de 1996 y el fueron registradas por el empleado (employeeId) 1, 2 & 3.','select orderid, customerId, employeeId from orders where year(orderdate) = 1996 and month(orderdate)= 12 and employeeid in (1, 2, 3) order by 1',2,4,1,0),
(13,'Órdenes de USA, Italy, France','Seleccionar todos los datos de las las órdenes de 1998 que fueron enviadas (shipcountry) a Estados Unidos (USA), Italia (Italy) o Francia (France) pero no deben aparecer las que se enviaron a las ciudades de Lyon, Nantes ni Marseille.','select * from orders where year(orderdate) = 1998 and shipcountry in (\'USA\', \'ITALY\', \'FRANCE\') and shipcity not in(\'Lyon\', \'Nantes\', \'Marseille\') order by 1',2,4,1,0),
(14,'Ciudades y envíos sin repetirse','Mostrar una lista de las ciudades a donde fueron enviadas las órdenes entre el 25 de junio y el 13 de julio de 1997. En la lista no deben repetirse los nombres de las ciudades. Y solamente se debe presentar el nombre de la ciudad.','Select distinct shipcity from orders where orderdate between \'1997-06-25\' and \'1997-07-13\' order by 1',2,4,1,0),
(15,'Órdenes de julio y agosto','Seleccione todos los datos de las órdenes que fueron enviadas a Alemania (Germany) en los meses de julio o agosto de 1996 y además no tienen ningún dato registrado en la región (shipRegion) La columna ShippedDate tiene registrada la fecha d…','select * from orders where shipregion is null and shipcountry like \'Germany\' and year(shippedDate) = 1996 and month(shippedDate) between 7 and 8 order by 1',2,4,1,0),
(16,'Ciudades de Europa','SELECCIONE EL ID DE LA CIUDAD, EL NOMBRE DE LA CIUDAD, EL DISTRITO DE LA CIUDAD Y EL NOMBRE DEL PAIS AL QUE PERTENECE LA CIUDAD. SOLO DEBEN APARECER LAS CIUDADES DE EUROPA. CAMBIE LOS ENCABEZADOS DEL NOMBRE DE LA CIUDAD (CITY.NAME) POR \"CIUDAD\"\" Y DEL ...\"','SELECT CI.ID, CI.NAME AS CIUDAD, CI.DISTRICT, CO.NAME AS PAIS FROM CITY CI JOIN COUNTRY CO ON CI.COUNTRYCODE = CO.CODE AND CONTINENT = \'EUROPE\' ORDER BY 1',1,1,1,0),
(17,'Lenguajes de paises de Oceanía','MOSTRAR LOS LENGUAJES DE LOS PAISES QUE SE ENCUENTRAN EN OCEANIA Y ADEMÁS TIENEN UN PORCENTAGE MAYOR A 0 SE DEBE MOSTRAR EL NOMBRE DEL PAÍS, EL LENGUAJE Y EL PORCENTAJE DE PERSONAS QUE HABLAN ESE LENGUAJE','SELECT CO.NAME, CL.LANGUAGE, CL.PERCENTAGE FROM COUNTRY CO JOIN COUNTRYLANGUAGE CL ON CO.CODE = CL.COUNTRYCODE WHERE CO.CONTINENT = \'OCEANIA\' AND PERCENTAGE > 0 ORDER BY 1, 2, 3',1,1,1,0),
(18,'Productos y categorías','SELECCIONE LA CLAVE DEL PRODUCTO, EL NOMBRE DEL PRODUCTO, EL PRECIO(UNITPRICE) Y EL NOMBRE DE LA CATEGORÍA A LA QUE PERTENECE (CATEGORYNAME).','SELECT P.PRODUCTID, P.PRODUCTNAME, P.UNITPRICE, C.CATEGORYNAME FROM PRODUCTS P NATURAL JOIN CATEGORIES C ORDER BY 1',2,1,1,0),
(19,'Productos de más de 20 dls.','SELECCIONE LA CLAVE DEL PRODUCTO, EL NOMBRE DEL PRODUCTO, EL PRECIO(UNITPRICE), EL NOMBRE DE LA CATEGORIA (CATEGORYNAME) Y EL NOMBRE DEL PROVEEEDOR (SUPPLIERS.COMPANYNAME) DE LOS PRODUCTOS QUE CUESTAN MAS DE 20 DOLARES.','SELECT P.PRODUCTID, P.PRODUCTNAME, P.UNITPRICE, C.CATEGORYNAME, S.COMPANYNAME FROM PRODUCTS P JOIN CATEGORIES C ON P.CATEGORYID = C.CATEGORYID JOIN SUPPLIERS S ON S.SUPPLIERID = P.SUPPLIERID WHERE UNITPRICE > 20 ORDER BY 1',2,1,1,0),
(20,'Órdenes de marzo del 97','SELECCIONE LA CLAVE DE LA ORDEN (ORDERID), LA FECHA DE LA ORDEN (ORDERDATE), LA CLAVE DEL CLIENTE (CUSTOMERS.CUSTOMERID) Y EL NOMBRE DE LA COMPAÑÍA (CUSTOMERS.COMPANYNAME) DE LAS ÓRDENES DEL MES DE MARZO DE 1997','SELECT O.ORDERID, O.ORDERDATE, C.CUSTOMERID, C.COMPANYNAME FROM ORDERS O NATURAL JOIN CUSTOMERS C WHERE YEAR(O.ORDERDATE) = 1997 AND MONTH(O.ORDERDATE) = 3 ORDER BY 1',2,1,1,0),
(21,'Productos y proveedores.','(BASE DE DATOS NWIND)Seleccione la clave del producto(productid), el nombre del producto(productname), el precio del producto(unitprice), el nombre del proveedor(suppliers.companyname), el paí­s del proveedor(country) de los productos cuyo proveedor(su...','select p.productid, p.productname, p.unitprice,s.companyname, s.country from products p natural join suppliers s where s.country in (\'Canada\', \'Italy\', \'France\') and p.unitprice > 20 order by 3 desc, 1',2,1,1,1),
(22,'Ordenes con compañias de enví­o.','(Base de datos NWIND) Seleccione la clave de la orden, la fecha de la orden(orderdate), la fecha de envío (shippedDate), el nombre de la compañía de envíos (Shippers.CompanyName) y el costo del enví­o (Freight) de las órdenes que fuereo...','select o.orderid, o.orderdate, o.shippedDate, s.companyName, o.Freight from orders o JOIN shippers s ON o.shipvia = s.shipperId where year(o.shippedDate)=1996 and month(o.shippedDate) = 12 order by 1',2,1,1,0),
(24,'Ciudades de mas de un millón.','(Base de datos World) Seleccione el nombre de la ciudad, el distrito, la población de la ciudad y el nombre del país.   Solo deben aparecer las ciudades de Estados Unidos (United States), México (Mexico) y Canadá (Canada) que tengan más de un millón de habitantes','select ci.name as ciudad, ci.district, ci.population, co.name as Pais from city ci join country co on ci.countryCode = co.Code and co.name in (\'Mexico\', \'Canada\', \'United States\') and ci.population > 1000000',1,1,1,0);

-- Crea usuario evaluador
CREATE USER if not exists 'evaluador'@'localhost' identified by 'evaluador';
GRANT SELECT ON world.* TO 'evaluador'@'localhost';
GRANT SELECT ON nwind.* TO 'evaluador'@'localhost';
GRANT SELECT ON sakila.* TO 'evaluador'@'localhost';
flush privileges;
-- end attached script 'script'
