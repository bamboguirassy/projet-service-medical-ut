<?php

namespace App\Form;

use App\Entity\Consultation;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ConsultationType extends AbstractType {

    public function buildForm(FormBuilderInterface $builder, array $options) {
        $builder
                ->add('date')
                ->add('userEmail')
                ->add('docteur')
                ->add('dossier')
                ->add('pathologies')
                ->add('medicamentPrescrits')
                ->add('motifConsultations')
                ->add('tensionArterielle')
                ->add('temperature')
                ->add('pouls')
                ->add('frequenceRespiratoire')
                ->add('poids')
                ->add('glycemie')
                ->add('examenCliniques')
                ->add('examenParacliniques')
        ;
    }

    public function configureOptions(OptionsResolver $resolver) {
        $resolver->setDefaults([
            'data_class' => Consultation::class,
        ]);
    }

}
