import json
import os
from collections import Counter

class CheckData:
    _log_file_dir:str = '/home/ud/UDW/ud.vio/LawDocManagerBackend/src/app/case_number/test/log_test'

    def read_files_extract_data(self):
        
        files = os.listdir(self._log_file_dir)
        list_of_data_from_files = []
        for file in files:
            file_case_number = [int]
            file_path = os.path.join(self._log_file_dir, file)
            with open(file_path, 'r') as json_file:
                raw_data = json.load(json_file)
                for data in raw_data:
                    file_case_number.append(data['data'])
                
                list_of_data_from_files.append(file_case_number)
        else:
            total_list = len(list_of_data_from_files)
            set_1 = set(list_of_data_from_files[0])
            set_2 = set(list_of_data_from_files[1])
            set_3 = set(list_of_data_from_files[2])
            similiar = set_1 & set_2 & set_3
            print(len(similiar))
            print(similiar)

if __name__ == "__main__":
    CheckData().read_files_extract_data()