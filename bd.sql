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
-- Table `SQLJudge`.`Problemas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SQLJudge`.`Problemas` (
  `idProblema` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` TEXT NOT NULL,
  `solucion` TEXT NOT NULL,
  `baseDeDatos` VARCHAR(20) NOT NULL,
  `categoria` INT NOT NULL,
  `dificultad` INT NOT NULL,
  PRIMARY KEY (`idProblema`),
  INDEX `fk_Problemas_Categorias1_idx` (`categoria` ASC) VISIBLE,
  CONSTRAINT `fk_Problemas_Categorias1`
    FOREIGN KEY (`categoria`)
    REFERENCES `SQLJudge`.`Categorias` (`idCategoria`)
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
  `veredicto` ENUM('AC', 'WA', 'RE') NOT NULL,
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
