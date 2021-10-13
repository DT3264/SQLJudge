-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Usuarios` (
  `idUsuario` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `correo` VARCHAR(45) NOT NULL,
  `clave` CHAR(32) NOT NULL,
  `pais` VARCHAR(45) NULL,
  `estado` VARCHAR(45) NULL,
  `escuela` VARCHAR(45) NULL,
  `tipo` ENUM('Admin', 'Alumno') NOT NULL,
  PRIMARY KEY (`idUsuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Categorias` (
  `idCategoria` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCategoria`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Problemas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Problemas` (
  `idProblema` INT NOT NULL,
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
    REFERENCES `mydb`.`Categorias` (`idCategoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Envios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Envios` (
  `idEnvio` INT NOT NULL,
  `idUsuario` INT NOT NULL,
  `idProblema` INT NOT NULL,
  `fecha` DATETIME NOT NULL DEFAULT 'now()',
  `veredicto` ENUM('AC', 'WA', 'RE') NOT NULL,
  `codigo` TEXT NOT NULL,
  `Respuesta` TEXT NOT NULL,
  PRIMARY KEY (`idEnvio`, `idUsuario`, `idProblema`),
  INDEX `fk_Usuarios_has_Problemas_Problemas1_idx` (`idProblema` ASC) VISIBLE,
  INDEX `fk_Usuarios_has_Problemas_Usuarios_idx` (`idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_Usuarios_has_Problemas_Usuarios`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `mydb`.`Usuarios` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Usuarios_has_Problemas_Problemas1`
    FOREIGN KEY (`idProblema`)
    REFERENCES `mydb`.`Problemas` (`idProblema`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Grupos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Grupos` (
  `idGrupo` INT NOT NULL,
  `encargado` INT NOT NULL,
  `codigoGrupo` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`idGrupo`),
  INDEX `fk_Grupo_Usuarios1_idx` (`encargado` ASC) VISIBLE,
  CONSTRAINT `fk_Grupo_Usuarios1`
    FOREIGN KEY (`encargado`)
    REFERENCES `mydb`.`Usuarios` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`RegistroGrupo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`RegistroGrupo` (
  `idUsuario` INT NOT NULL,
  `idGrupo` INT NOT NULL,
  PRIMARY KEY (`idUsuario`, `idGrupo`),
  INDEX `fk_Usuarios_has_Grupo_Grupo1_idx` (`idGrupo` ASC) VISIBLE,
  INDEX `fk_Usuarios_has_Grupo_Usuarios1_idx` (`idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_Usuarios_has_Grupo_Usuarios1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `mydb`.`Usuarios` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Usuarios_has_Grupo_Grupo1`
    FOREIGN KEY (`idGrupo`)
    REFERENCES `mydb`.`Grupos` (`idGrupo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Tareas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Tareas` (
  `idTarea` INT NOT NULL,
  `idGrupo` INT NOT NULL,
  `fechaLimite` DATETIME NOT NULL,
  `fechaAsignacion` DATETIME NOT NULL,
  PRIMARY KEY (`idTarea`),
  INDEX `fk_Tareas_Grupos1_idx` (`idGrupo` ASC) VISIBLE,
  CONSTRAINT `fk_Tareas_Grupos1`
    FOREIGN KEY (`idGrupo`)
    REFERENCES `mydb`.`Grupos` (`idGrupo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ProblemasTareas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`ProblemasTareas` (
  `idTarea` INT NOT NULL,
  `idProblema` INT NOT NULL,
  PRIMARY KEY (`idTarea`, `idProblema`),
  INDEX `fk_Tareas_has_Problemas_Problemas1_idx` (`idProblema` ASC) VISIBLE,
  INDEX `fk_Tareas_has_Problemas_Tareas1_idx` (`idTarea` ASC) VISIBLE,
  CONSTRAINT `fk_Tareas_has_Problemas_Tareas1`
    FOREIGN KEY (`idTarea`)
    REFERENCES `mydb`.`Tareas` (`idTarea`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Tareas_has_Problemas_Problemas1`
    FOREIGN KEY (`idProblema`)
    REFERENCES `mydb`.`Problemas` (`idProblema`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`CodigosRegistro`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`CodigosRegistro` (
  `idCodigoRegistro` INT NOT NULL,
  `codigo` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`idCodigoRegistro`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
