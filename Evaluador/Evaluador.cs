using dotenv.net;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQL_Judge.Evaluador
{
    public class Evaluador
    {
        /// <summary>
        /// Conexión a la base de datos.
        /// </summary>
        /// <returns>Cadena de conexión a la base de datos.</returns>
        public string GetConnectionString(string database)
        {
            return string.Format("Server=database-2.cdwt2nqbqpoy.us-east-2.rds.amazonaws.com;Database={0};Uid=evaluador;Pwd=evaluador;Allow User Variables=true", database);
        }

        /// <summary>
        /// Este método sirve para llenar GridsView y combos.
        /// Regresa un DataSet.
        /// </summary>
        /// <param name="mysql">Comando SQL</param>
        /// <returns>DataSet útil para llenar controles de datos.</returns>
        public DataTable ejecutaConsulta(string mysql, string database)
        {
            DataSet dataSet = new DataSet();
            MySqlDataAdapter dataAdapter = new MySqlDataAdapter();
            MySqlConnection conexion = new MySqlConnection();
            MySqlCommand comando = new MySqlCommand();
            comando.CommandType = CommandType.Text;
            try
            {
                conexion.ConnectionString = GetConnectionString(database);
                conexion.Open();
                comando.CommandText = mysql;
                dataAdapter.SelectCommand = comando;
                dataAdapter.SelectCommand.Connection = conexion;
                dataAdapter.Fill(dataSet);
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                conexion.Close();
            }
            return dataSet.Tables[0];
        }




        /// <summary>
        /// metodo utilizado para evaluar la sentencia sql ingresada por el usuario
        /// </summary>
        /// <param name="sqlUsuario">consulta ingresada por el usuario</param>
        /// <param name="sqlSolucion">solucion del problema planteado</param>
        /// <param name="evaluarOrden">si debe evaluar el orden de las filas</param>
        /// <returns>el resultado de la evaluacion</returns>
        public string Evaluar(string sqlUsuario, string sqlSolucion, byte evaluarOrden, string database)
        {
            string strResultado;
            DataTable tblEvaluada;

            // ============================================================
            // OBTIENE LA CONSULTA SOLUCION
            DataTable tblSolucion = ejecutaConsulta(sqlSolucion, database);

            // ===========================================================
            // QUITAR EL PUNTO Y COMA SI LO TIENE.
            sqlUsuario = sqlUsuario.Replace(";", "");

            // ===========================================================
            // AJUSTAR LA CONSULTA PARA QUE FUNCIONE LO DEL ORDER BY
            sqlUsuario = sqlUsuario.ToUpper();
            if (evaluarOrden == 0)
            {
                sqlUsuario = "select * from ( " + sqlUsuario + ") as Consulta " + CadenaOrderBy(tblSolucion.Columns.Count);
            }

            // ============================================================
            // OBTIENE LA CONSULTA A EVALUAR
            try
            {
                tblEvaluada = ejecutaConsulta(sqlUsuario, database);
            }
            catch (MySqlException errorC)
            {
                if (errorC.Number == 1060)
                {
                    strResultado = "CD";
                    // "Columnas Duplicadas"
                }
                else
                {
                    strResultado = "RT";
                    // "Runtime Error"
                }
                return strResultado;
            }


            // ============================================================
            // VERIFICA LA CANTIDAD DE RENGLONES
            if (tblEvaluada.Rows.Count != tblSolucion.Rows.Count)
            {
                strResultado = "NR";
                //"NUMERO DE REGISTROS INCORRECTO"
                return strResultado;
            }

            // ============================================================
            // VERIFICA LA CANTIDAD DE COLUMNAS
            if (tblEvaluada.Columns.Count != tblSolucion.Columns.Count)
            {
                strResultado = "NC";
                //"NUMERO DE COLUMNAS INCORRECTO"
                return strResultado;
            }

            // ============================================================
            // CODIGO PARA COMPARAR DOS CONSULTAS SQL
            // OBJETO QUE PERMITE COMPARAR DOS RENGLONES
            IEqualityComparer<DataRow> comparadorFilas = DataRowComparer.Default;
            bool resultadoIgual = true;
            for (int i = 0; i <= tblSolucion.Rows.Count - 1; i++)
            {
                if (comparadorFilas.Equals(tblEvaluada.Rows[i], tblSolucion.Rows[i]) == false)
                {
                    resultadoIgual = false;
                    i = tblSolucion.Rows.Count;
                }
            }
            if (resultadoIgual)
            {
                strResultado = "AC";
                // "ACEPTADO"
            }
            else
            {
                strResultado = "WA";
                // "RESPUESTA INCORRECTA"
            }
            return strResultado;
        }

        private static string CadenaOrderBy(int columnas)
        {
            string strCadenaOrderBy = " order by 1";
            for (int i = 2; i <= columnas; i++)
            {
                strCadenaOrderBy = strCadenaOrderBy + ", " + i;
            }

            return strCadenaOrderBy;
        }

    }
}