<?php


namespace App\Service;


class Validation
{
    /**
     * Permet de valider les regles de creation du password et la confirmation password
     *
     * @param $password
     * @param $password2
     * @return int|string
     */
    public function validatePassword($password, $password2){
        if($password == "" or $password2 == ""){
            return 'Tous les champs doivent être remplis.';
        }

        if(preg_match('/^(?=.{12,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\w).*$/', $password) != 1){
            return 'Le mot de passe ne répond pas aux règles de création.';
        }

        if($password != $password2){
            return 'Les mots de passe ne sont pas identiques.';
        }

        return 1;
    }
}