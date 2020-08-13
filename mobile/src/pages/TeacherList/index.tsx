import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';

import styles from './styles';
import PageHeader from '../components/PageHeader';
import TeacherItem, { Teacher } from '../components/TeacherItem';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';

const TeacherList: React.FC = () => {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    AsyncStorage.getItem('favorites').then(response => {
      if(response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) =>{
          return teacher.id
        })
        setFavorites(favoritedTeachersIds);
      }
    });
  }, []);

  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible);
  }

  async function handleFiltersSubmit() {
    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time,
      }
    });

    setIsFiltersVisible(false);
    setTeachers(response.data);
  }

  const [subject, setSubject] = useState('');
  const [week_day, setWeek_day] = useState('');
  const [time, setTime] = useState('');

  return (
    <View style={styles.container}>
      <PageHeader title='Proffys disponíveis' headerRight={(
        <BorderlessButton onPress={handleToggleFiltersVisible}>
          <Feather name="filter" size={20} color="#FFF" />
        </BorderlessButton>
        )}>
        {isFiltersVisible && (<View style={styles.searchForm}>
          <Text style={styles.label}>Matéria</Text>
          <TextInput placeholderTextColor="#c1bccc" value={subject} onChangeText={text => setSubject(text)} style={styles.input} placeholder="Qual a matéria?" />

          <View style={styles.inputGroup}>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Dia da semana</Text>
              <TextInput placeholderTextColor="#c1bccc" value={week_day} onChangeText={text => setWeek_day(text)} style={styles.input} placeholder="Qual o dia?" />
            </View>

            <View style={styles.inputBlock}>
              <Text style={styles.label}>Horário</Text>
              <TextInput placeholderTextColor="#c1bccc" value={time} onChangeText={text => setTime(text)} style={styles.input} placeholder="Qual horário?" />
            </View>
          </View>

          <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Filtrar</Text>
          </RectButton>
        </View>
        )}
      </PageHeader>

      <ScrollView style={styles.teacherList} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}>
        {teachers.map((teacher: Teacher) => {
          return (
          <TeacherItem key={teacher.id} favorited={favorites.includes(teacher.id)} teacher={teacher}/>
        )
        })}
      </ScrollView>
    </View>
  )
}

export default TeacherList;