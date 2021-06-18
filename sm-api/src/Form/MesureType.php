<?php

namespace App\Form;

use App\Entity\Mesure;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class MesureType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('tensionArterielle')
            ->add('temperature')
            ->add('pouls')
            ->add('frequenceRespiratoire')
            ->add('poids')
            ->add('glycemie')
            ->add('examenParacliniques')
            ->add('examenCliniques')
            ->add('rendezVous')
            ->add('medicaments')
            ->add('symptomes')
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Mesure::class,
        ]);
    }
}
