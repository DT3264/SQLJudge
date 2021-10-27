import React from "react";
import withAuthGeneral from "./Auth/withAuthGeneral";

class VistaProblema extends React.Component {
    render(){
        return(
            <div>
                <h1 style={{textAlign : "center"}}>TITULO DEL PROBLEMA</h1>
                <div>
                    <p style={{textAlign : "center"}}> id: number categoria: name category base de datos : name data base No. Resueltos : number <br/></p>
                </div>
                <button type="button" class="btn btn-primary">Ver envios</button>
                <div>
                    <p style={{textAlign : "justify"}}>You are given a string s. You need to find two non-empty strings a and b such that the following conditions are satisfied:

Strings a and b are both subsequences of s.
For each index i, character si of string s must belong to exactly one of strings a or b.
String a is lexicographically minimum possible; string b may be any possible string.
Given string s, print any valid a and b.

Reminder:<br />

A string a (b) is a subsequence of a string s if a (b) can be obtained from s by deletion of several (possibly, zero) elements. For example, 
"dores", "cf", and "for" are subsequences of "codeforces", while "decor" and "fork" are not.<br />

A string x is lexicographically smaller than a string y if and only if one of the following holds:<br />

x is a prefix of y, but x≠y;
in the first position where x and y differ, the string x has a letter that appears earlier in the alphabet than the corresponding letter in y.<br />
Input<br />
Each test contains multiple test cases. The first line contains the number of test cases t (1≤t≤1000). Description of the test cases follows.

The first and only line of each test case contains one string s (2≤|s|≤100 where |s| means the length of s). String s consists of lowercase Latin letters.

Output
For each test case, print the strings a and b that satisfy the given conditions. If there are multiple answers, print any.</p>
                </div>
                <div>
                    <label>Codigo fuente : </label>
                    <textarea
                        className="form-control"
                        style={{ height: "25rem" }}
                    ></textarea>
                </div>
                <button type="button" class="btn btn-success">Enviar</button>                
            </div>
        );
    }
}

export default withAuthGeneral( VistaProblema );