"""
Unit tests for rk-motion-forge CLI (scripts/forge.py)
"""
import json
import os
import subprocess
import sys
import pytest

# Add scripts to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'scripts'))

from forge import list_products


class TestListProducts:
    """Tests for listing products"""

    def test_list_products_runs_without_error(self, capsys):
        list_products()
        captured = capsys.readouterr()
        assert 'Ranuk Motion Forge' in captured.out
        assert 'datacanvas' in captured.out
        assert 'ranuk-profit' in captured.out
        assert 'reveal' in captured.out


class TestCLI:
    """Integration tests for the CLI"""

    def test_help_command(self):
        result = subprocess.run(
            [sys.executable, 'scripts/forge.py', '--help'],
            cwd=os.path.join(os.path.dirname(__file__), '..'),
            capture_output=True,
            text=True
        )
        assert result.returncode == 0
        assert 'Ranuk Motion Forge CLI' in result.stdout

    def test_list_command(self):
        result = subprocess.run(
            [sys.executable, 'scripts/forge.py', '--list'],
            cwd=os.path.join(os.path.dirname(__file__), '..'),
            capture_output=True,
            text=True
        )
        assert result.returncode == 0
        assert 'datacanvas' in result.stdout
        assert 'ranuk-profit' in result.stdout
        assert 'reveal' in result.stdout

    def test_invalid_product_fails(self):
        result = subprocess.run(
            [sys.executable, 'scripts/forge.py', '--product', 'nonexistent'],
            cwd=os.path.join(os.path.dirname(__file__), '..'),
            capture_output=True,
            text=True
        )
        assert result.returncode != 0
        assert 'no encontrado' in result.stdout.lower() or 'not found' in result.stdout.lower()


class TestProductDataFiles:
    """Tests for product JSON files - validate actual structure"""

    def test_json_files_exist_and_valid(self):
        products_dir = os.path.join(os.path.dirname(__file__), '..', 'products')
        for filename in ['datacanvas.json', 'ranuk-profit.json', 'reveal.json']:
            filepath = os.path.join(products_dir, filename)
            assert os.path.exists(filepath), f"Missing {filename}"
            with open(filepath) as f:
                data = json.load(f)
                assert 'id' in data
                assert 'name' in data
                assert 'tagline' in data

    def test_products_have_core_sections(self):
        products_dir = os.path.join(os.path.dirname(__file__), '..', 'products')
        for filename in ['datacanvas.json', 'ranuk-profit.json', 'reveal.json']:
            filepath = os.path.join(products_dir, filename)
            with open(filepath) as f:
                data = json.load(f)
                # Core sections present in actual product data
                assert 'hook' in data
                assert 'features' in data
                assert 'productShowcase' in data
                assert 'systemPipeline' in data
                assert 'mission' in data
                assert 'outro' in data

    def test_features_have_required_fields(self):
        products_dir = os.path.join(os.path.dirname(__file__), '..', 'products')
        for filename in ['datacanvas.json', 'ranuk-profit.json', 'reveal.json']:
            filepath = os.path.join(products_dir, filename)
            with open(filepath) as f:
                data = json.load(f)
                for feature in data['features']:
                    assert 'tag' in feature
                    assert 'name' in feature
                    assert 'benefit' in feature
                    assert 'metricLabel' in feature
                    assert 'metricValue' in feature
                    assert 'iconType' in feature

    def test_system_pipeline_has_steps(self):
        products_dir = os.path.join(os.path.dirname(__file__), '..', 'products')
        for filename in ['datacanvas.json', 'ranuk-profit.json', 'reveal.json']:
            filepath = os.path.join(products_dir, filename)
            with open(filepath) as f:
                data = json.load(f)
                assert len(data['systemPipeline']) >= 3
                for step in data['systemPipeline']:
                    assert 'step' in step
                    assert 'title' in step
                    assert 'metric' in step
                    assert 'sub' in step


class TestVideoOutputs:
    """Tests that verify video generation produces output files"""

    def test_dist_videos_exist(self):
        dist_videos = os.path.join(os.path.dirname(__file__), '..', 'dist', 'videos')
        expected = [
            'datacanvas_promo_15s.mp4',
            'ranuk-profit_promo_15s.mp4',
            'reveal_promo_15s.mp4'
        ]
        for fname in expected:
            fpath = os.path.join(dist_videos, fname)
            assert os.path.exists(fpath), f"Missing video: {fname}"
            assert os.path.getsize(fpath) > 1000000, f"Video too small: {fname}"

    def test_dist_posters_exist(self):
        dist_posters = os.path.join(os.path.dirname(__file__), '..', 'dist', 'posters')
        expected = [
            'datacanvas_poster.jpg',
            'ranuk-profit_poster.jpg',
            'reveal_poster.jpg'
        ]
        for fname in expected:
            fpath = os.path.join(dist_posters, fname)
            assert os.path.exists(fpath), f"Missing poster: {fname}"
            assert os.path.getsize(fpath) > 50000, f"Poster too small: {fname}"


if __name__ == '__main__':
    pytest.main([__file__, '-v'])