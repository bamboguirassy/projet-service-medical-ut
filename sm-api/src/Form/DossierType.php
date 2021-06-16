<?php

namespace App\Form;

use App\Entity\Dossier;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class DossierType extends AbstractType {

    public function buildForm(FormBuilderInterface $builder, array $options) {
        $builder
                ->add('numero')
                ->add('prenoms')
                ->add('nom')
                ->add('dateNaissance')
                ->add('cni')
                ->add('telephone')
                ->add('typePatient')
                ->add('lienParente')
                ->add('matricule')
                ->add('prenomTravailleur')
                ->add('nomTravailleur')
                ->add('genre')
                ->add('dateCreation')
                ->add('userEmail')
                ->add('etat')
                ->add('structure')
                ->add('historiqueMaladies')
                ->add('niveauInstruction')
                ->add('situationMatrimoniale')
                ->add('genreVie')
                ->add('descriptionGenreVie')
                ->add('professionMari')
                ->add('antecedentMedicaux')
                ->add('antecedentChurirgicaux')
                ->add('antecedentFamiliaux')
                ->add('dateMariage')
        ;
    }

    public function configureOptions(OptionsResolver $resolver) {
        $resolver->setDefaults([
            'data_class' => Dossier::class,
        ]);
    }

}
