package com.opl.aircraftperformancecalculator.service;

import com.opl.aircraftperformancecalculator.models.Loadout;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Collection;

import static java.lang.Boolean.TRUE;

public interface LoadoutService {

    Loadout create(Loadout loadout);
    Collection<Loadout> list(int limit);
    Loadout get(Long id);
    Loadout update(Loadout loadout);
    Boolean delete(Long id);
    Loadout calculate(Loadout loadout) throws FileNotFoundException;
}
