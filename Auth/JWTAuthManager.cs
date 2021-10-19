using Microsoft.IdentityModel.Tokens;
using SQL_Judge.BD;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace SQL_Judge
{
    public class JWTAuthManager : IJWTAuthManager
    {

        private readonly string tokenKey;


        public JWTAuthManager(string tokenKey)
        {
            this.tokenKey = tokenKey;
        }

        private bool isSamePassword(string inputPass, string savedPass) {
            string hashedPass = getStringHash(inputPass).ToLower();
            return hashedPass == savedPass;
        }

        public static string getStringHash(string passwordString)
        {
            HashAlgorithm algorithm = SHA256.Create();
            var hashBytes = algorithm.ComputeHash(Encoding.UTF8.GetBytes(passwordString));
            StringBuilder sb = new StringBuilder();
            foreach (byte b in hashBytes)
                sb.Append(b.ToString("X2"));
            return sb.ToString();
            
        }


        public LoginResponse Authenticate(string username, string password)
        {
            Usuario usuario;
            using (SQLJudgeContext context = new SQLJudgeContext())
            {
                var usuariosBD = context.Usuarios.ToList();
                usuario = usuariosBD.FirstOrDefault(u => u.Usuario1 == username && isSamePassword(password, u.Clave));
            }

            if (usuario == null) return null;

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(tokenKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, usuario.Usuario1),
                    new Claim(ClaimTypes.Role, usuario.Tipo),
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return new LoginResponse() { 
                usuario = usuario.Usuario1,
                tipo = usuario.Tipo,
                token = tokenHandler.WriteToken(token)
            };
        }
    }
}
