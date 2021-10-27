using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace SQL_Judge.BD
{
    public partial class sqljudgeContext : DbContext
    {
        public sqljudgeContext()
        {
        }

        public sqljudgeContext(DbContextOptions<sqljudgeContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Basesdedato> Basesdedatos { get; set; }
        public virtual DbSet<Categoria> Categorias { get; set; }
        public virtual DbSet<Codigosregistro> Codigosregistros { get; set; }
        public virtual DbSet<Envio> Envios { get; set; }
        public virtual DbSet<Grupo> Grupos { get; set; }
        public virtual DbSet<Problema> Problemas { get; set; }
        public virtual DbSet<Problemastarea> Problemastareas { get; set; }
        public virtual DbSet<Registrogrupo> Registrogrupos { get; set; }
        public virtual DbSet<Tarea> Tareas { get; set; }
        public virtual DbSet<Usuario> Usuarios { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                DotEnv.Load();
                var envVars = DotEnv.Read();
                optionsBuilder.UseMySQL(envVars["DB_URL"]);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Basesdedato>(entity =>
            {
                entity.HasKey(e => e.IdBase)
                    .HasName("PRIMARY");

                entity.ToTable("basesdedatos");

                entity.Property(e => e.IdBase).HasColumnName("idBase");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasMaxLength(45)
                    .HasColumnName("nombre");
            });

            modelBuilder.Entity<Categoria>(entity =>
            {
                entity.HasKey(e => e.IdCategoria)
                    .HasName("PRIMARY");

                entity.ToTable("categorias");

                entity.Property(e => e.IdCategoria).HasColumnName("idCategoria");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasMaxLength(45)
                    .HasColumnName("nombre");
            });

            modelBuilder.Entity<Codigosregistro>(entity =>
            {
                entity.HasKey(e => e.IdCodigoRegistro)
                    .HasName("PRIMARY");

                entity.ToTable("codigosregistro");

                entity.Property(e => e.IdCodigoRegistro).HasColumnName("idCodigoRegistro");

                entity.Property(e => e.Codigo)
                    .IsRequired()
                    .HasMaxLength(32)
                    .HasColumnName("codigo");
            });

            modelBuilder.Entity<Envio>(entity =>
            {
                entity.HasKey(e => new { e.IdEnvio, e.IdUsuario, e.IdProblema })
                    .HasName("PRIMARY");

                entity.ToTable("envios");

                entity.HasIndex(e => e.IdProblema, "fk_Usuarios_has_Problemas_Problemas1_idx");

                entity.HasIndex(e => e.IdUsuario, "fk_Usuarios_has_Problemas_Usuarios_idx");

                entity.Property(e => e.IdEnvio)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("idEnvio");

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.Property(e => e.IdProblema).HasColumnName("idProblema");

                entity.Property(e => e.Codigo)
                    .IsRequired()
                    .HasColumnName("codigo");

                entity.Property(e => e.Fecha)
                    .HasColumnName("fecha")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.Respuesta).IsRequired();

                entity.Property(e => e.Veredicto)
                    .IsRequired()
                    .HasColumnType("enum('AC','WA','RE')")
                    .HasColumnName("veredicto");

                entity.HasOne(d => d.IdProblemaNavigation)
                    .WithMany(p => p.Envios)
                    .HasForeignKey(d => d.IdProblema)
                    .HasConstraintName("fk_Usuarios_has_Problemas_Problemas1");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Envios)
                    .HasForeignKey(d => d.IdUsuario)
                    .HasConstraintName("fk_Usuarios_has_Problemas_Usuarios");
            });

            modelBuilder.Entity<Grupo>(entity =>
            {
                entity.HasKey(e => e.IdGrupo)
                    .HasName("PRIMARY");

                entity.ToTable("grupos");

                entity.HasIndex(e => e.Docente, "fk_Grupo_Usuarios1_idx");

                entity.Property(e => e.IdGrupo).HasColumnName("idGrupo");

                entity.Property(e => e.CodigoClase)
                    .IsRequired()
                    .HasMaxLength(10)
                    .HasColumnName("codigoClase");

                entity.Property(e => e.Docente).HasColumnName("docente");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasMaxLength(45)
                    .HasColumnName("nombre");

                entity.HasOne(d => d.DocenteNavigation)
                    .WithMany(p => p.Grupos)
                    .HasForeignKey(d => d.Docente)
                    .HasConstraintName("fk_Grupo_Usuarios1");
            });

            modelBuilder.Entity<Problema>(entity =>
            {
                entity.HasKey(e => e.IdProblema)
                    .HasName("PRIMARY");

                entity.ToTable("problemas");

                entity.HasIndex(e => e.IdBase, "fk_Problemas_BasesDeDatos1_idx");

                entity.HasIndex(e => e.IdCategoria, "fk_Problemas_Categorias1_idx");

                entity.Property(e => e.IdProblema).HasColumnName("idProblema");

                entity.Property(e => e.BaseDeDatos)
                    .IsRequired()
                    .HasMaxLength(20)
                    .HasColumnName("baseDeDatos");

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasColumnName("descripcion");

                entity.Property(e => e.Dificultad).HasColumnName("dificultad");

                entity.Property(e => e.IdBase).HasColumnName("idBase");

                entity.Property(e => e.IdCategoria).HasColumnName("idCategoria");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasMaxLength(45)
                    .HasColumnName("nombre");

                entity.Property(e => e.Solucion)
                    .IsRequired()
                    .HasColumnName("solucion");

                entity.HasOne(d => d.IdBaseNavigation)
                    .WithMany(p => p.Problemas)
                    .HasForeignKey(d => d.IdBase)
                    .HasConstraintName("fk_Problemas_BasesDeDatos1");

                entity.HasOne(d => d.IdCategoriaNavigation)
                    .WithMany(p => p.Problemas)
                    .HasForeignKey(d => d.IdCategoria)
                    .HasConstraintName("fk_Problemas_Categorias1");
            });

            modelBuilder.Entity<Problemastarea>(entity =>
            {
                entity.HasKey(e => new { e.IdTarea, e.IdProblema })
                    .HasName("PRIMARY");

                entity.ToTable("problemastareas");

                entity.HasIndex(e => e.IdProblema, "fk_Tareas_has_Problemas_Problemas1_idx");

                entity.HasIndex(e => e.IdTarea, "fk_Tareas_has_Problemas_Tareas1_idx");

                entity.Property(e => e.IdTarea).HasColumnName("idTarea");

                entity.Property(e => e.IdProblema).HasColumnName("idProblema");

                entity.HasOne(d => d.IdProblemaNavigation)
                    .WithMany(p => p.Problemastareas)
                    .HasForeignKey(d => d.IdProblema)
                    .HasConstraintName("fk_Tareas_has_Problemas_Problemas1");

                entity.HasOne(d => d.IdTareaNavigation)
                    .WithMany(p => p.Problemastareas)
                    .HasForeignKey(d => d.IdTarea)
                    .HasConstraintName("fk_Tareas_has_Problemas_Tareas1");
            });

            modelBuilder.Entity<Registrogrupo>(entity =>
            {
                entity.HasKey(e => new { e.IdUsuario, e.IdGrupo })
                    .HasName("PRIMARY");

                entity.ToTable("registrogrupo");

                entity.HasIndex(e => e.IdGrupo, "fk_Usuarios_has_Grupo_Grupo1_idx");

                entity.HasIndex(e => e.IdUsuario, "fk_Usuarios_has_Grupo_Usuarios1_idx");

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.Property(e => e.IdGrupo).HasColumnName("idGrupo");

                entity.HasOne(d => d.IdGrupoNavigation)
                    .WithMany(p => p.Registrogrupos)
                    .HasForeignKey(d => d.IdGrupo)
                    .HasConstraintName("fk_Usuarios_has_Grupo_Grupo1");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Registrogrupos)
                    .HasForeignKey(d => d.IdUsuario)
                    .HasConstraintName("fk_Usuarios_has_Grupo_Usuarios1");
            });

            modelBuilder.Entity<Tarea>(entity =>
            {
                entity.HasKey(e => e.IdTarea)
                    .HasName("PRIMARY");

                entity.ToTable("tareas");

                entity.HasIndex(e => e.IdGrupo, "fk_Tareas_Grupos1_idx");

                entity.Property(e => e.IdTarea).HasColumnName("idTarea");

                entity.Property(e => e.FechaAsignacion).HasColumnName("fechaAsignacion");

                entity.Property(e => e.FechaLimite).HasColumnName("fechaLimite");

                entity.Property(e => e.IdGrupo).HasColumnName("idGrupo");

                entity.HasOne(d => d.IdGrupoNavigation)
                    .WithMany(p => p.Tareas)
                    .HasForeignKey(d => d.IdGrupo)
                    .HasConstraintName("fk_Tareas_Grupos1");
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.IdUsuario)
                    .HasName("PRIMARY");

                entity.ToTable("usuarios");

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.Property(e => e.ApellidoM)
                    .IsRequired()
                    .HasMaxLength(45)
                    .HasColumnName("apellidoM");

                entity.Property(e => e.ApellidoP)
                    .IsRequired()
                    .HasMaxLength(45)
                    .HasColumnName("apellidoP");

                entity.Property(e => e.Clave)
                    .IsRequired()
                    .HasMaxLength(64)
                    .HasColumnName("clave")
                    .IsFixedLength(true);

                entity.Property(e => e.Correo)
                    .IsRequired()
                    .HasMaxLength(45)
                    .HasColumnName("correo");

                entity.Property(e => e.Escuela)
                    .HasMaxLength(45)
                    .HasColumnName("escuela");

                entity.Property(e => e.Estado)
                    .HasMaxLength(45)
                    .HasColumnName("estado");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasMaxLength(45)
                    .HasColumnName("nombre");

                entity.Property(e => e.Pais)
                    .HasMaxLength(45)
                    .HasColumnName("pais");

                entity.Property(e => e.Tipo)
                    .IsRequired()
                    .HasColumnType("enum('Admin','Alumno')")
                    .HasColumnName("tipo");

                entity.Property(e => e.Usuario1)
                    .IsRequired()
                    .HasMaxLength(32)
                    .HasColumnName("usuario");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
