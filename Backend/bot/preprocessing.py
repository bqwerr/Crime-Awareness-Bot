import json
import nltk
import numpy
import string
import pickle
from nltk.stem.lancaster import LancasterStemmer
import os

nltk.download('punkt')  
stemmer = LancasterStemmer()
intents_file = os.path.join(os.path.dirname(os.path.dirname(__file__)),'intents.json')

def bag_of_words(s, words):
    bag = [0 for _ in range(len(words))]

    s_words = nltk.word_tokenize(s)
    s_words = [stemmer.stem(word.lower()) for word in s_words]

    for se in s_words:
        for i, w in enumerate(words):
            if w == se:
                bag[i] = 1

    return numpy.array(bag)


def create_vocab_and_data_clean():

    with open(intents_file) as file:
        data = json.load(file)

    try:
        with open("data.pickle", "rb") as f:
            words, labels, trainings, outputs = pickle.load(f)
    except:
        words = []  # all valid tokens used in intents.json file
        labels = [] # classes
        docs_x = [] 
        docs_y = []

        for intent in data["intents"]:
            for pattern in intent["patterns"]:
                tokens = nltk.word_tokenize(pattern)
                words.extend(tokens)
                docs_x.append(tokens)
                docs_y.append(intent["tag"])

            if intent["tag"] not in labels:
                labels.append(intent["tag"])

        words = [stemmer.stem(word.lower()) for word in words if word not in string.punctuation]
        words = sorted(list(set(words)))
        labels = sorted(labels)

        # Data Cleaning
       
        trainings = []  # training vectors
        outputs= []    # output vectors
        out_empty = [0 for _ in range(len(labels))]

        for idx, doc in enumerate(docs_x):
            bag = []

            wrds = [stemmer.stem(word.lower()) for word in doc]

            for word in words:
                if word in wrds:
                    bag.append(1)
                else:
                    bag.append(0)

            output_row = out_empty[:]
            output_row[labels.index(docs_y[idx])] = 1

            trainings.append(bag)
            outputs.append(output_row)


        trainings = numpy.array(trainings)
        outputs = numpy.array(outputs)

        with open("data.pickle", "wb") as f:
            pickle.dump((words, labels, trainings, outputs), f)

    return words, labels, trainings, outputs, data


