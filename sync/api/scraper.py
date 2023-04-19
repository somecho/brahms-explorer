from __future__ import annotations
import requests
import re
from bs4 import BeautifulSoup
import bs4
from . import regex


def get_url(page_num: int = 1) -> str:
    """
    - page_num: int
    - returns: str - formatted ircam URL with page number
    """
    return f"https://brahms.ircam.fr/en/works/search/?page={page_num}&title=&fr_title=&length_0=&length_1=&scenic=1&arrangement=1&ircam=1&ircam_curriculum=1&electronic=1&revision_start_min_year=&revision_start_max_year=&revision_end_min_year=&revision_end_max_year=&creation_min_year=&creation_max_year=&revision_set__place=&revision_set__interpreters=&commanditary=&dedicatee=&studio_information=&parts_title="


def get_num_pages() -> int:
    """
    Gets the number of pages of results from IRCAM.
    - returns: int
    """
    url = get_url()
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")
    pagination = soup.find_all("ul", {"class": "pagination"})[0]
    pages = pagination.find_all("li")
    soup.decompose()
    return int(pages[-2].getText())


def strip_title_composer(tag: bs4.element.Tag) -> str:
    """
    removes title and composer from tag
    """
    return " ".join(tag.getText().split('/')[:-1]).replace(tag.findAll('a')[0].getText(), '')


def get_year(raw_text: str) -> str:
    """
    Use regex to match and capture year.
    - returns: str - year e.g. (1923) or (1923-1925)
    """
    # match and capture (1923) or (1923-1925)
    year = re.findall(regex.year, raw_text)
    if (len(year) > 0):
        return year[0].replace("(", '').replace(")", '')
    return ""


def get_minutes(raw_text: str) -> str:
    """
    gets minute string
    """
    minutes = re.findall(regex.minutes, raw_text)
    if (len(minutes) > 0):
        return minutes[0]
    return ""


def get_seconds(raw_text: str) -> str:
    """
    gets seconds string
    """
    seconds = re.findall(regex.seconds, raw_text)
    if (len(seconds) > 0):
        return seconds[0]
    return ""


def get_duration(raw_text: str) -> int:
    """
    Gets minutes and seconds information from piece string.
    Then converts to int and returns as total amount of seconds.
    """
    minutes = get_minutes(raw_text) or 0
    seconds = get_seconds(raw_text) or 0
    return int(minutes) * 60 + int(seconds)


def remove_span(tag: bs4.element.Tag):
    """
    removes span tags from element
    """
    for s in tag.findAll("span"):
        s.decompose()


def process_page(page: requests.Response) -> list[str]:
    """
    Takes a response from a get request to IRCAM and parses the
    page with Beautiful Soup. Returns a list of pieces as
    html strings.
    - page: requests.models.Response
    - returns: list[str]
    """
    soup = BeautifulSoup(page.content, "html.parser")
    uls = soup.find_all('ul')
    soup.decompose()
    return list(filter(lambda x: type(x).__name__ == "Tag", uls[1]))


def get_subtitle(raw_text: str) -> str:
    instrumentation = re.findall(regex.subtitle, raw_text)
    if (len(instrumentation) > 0):
        return instrumentation[0].strip(" ").replace("[program note]", '')
    return ""


def get_composer(tag: bs4.element.Tag) -> str:
    return tag.findAll('a')[-1].getText()


def get_title(tag: bs4.element.Tag) -> str:
    return tag.findAll('a')[0].getText().replace('"', '')


def process_composer(composer: str) -> dict:
    return {
        'full_name': composer,
        'first_name': composer.split(' ')[0],
        'last_name': composer.split(' ')[-1],
    }


def extract_piece(piece: bs4.element.Tag) -> dict:
    remove_span(piece)
    title = get_title(piece)
    composer = get_composer(piece)
    stripped = strip_title_composer(piece)
    subtitle = get_subtitle(stripped)
    full_year = get_year(stripped)
    year = int(full_year[:4]) if full_year else None
    duration = get_duration(stripped)
    piece.decompose()
    return {
        'title': title,
        'subtitle': subtitle,
        'composer': composer,
        'full_year': full_year,
        'year': year,
        'duration': duration
    }
